/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const Ajv = require('ajv');
const ajvKeywords = require('ajv-keywords');
const { deepStrictEqual } = require('assert');

let ajv;
let previousConstructorOptions;
const defaults = {
  v5: true,
  coerceTypes: 'array', // important for query string params
  allErrors: true,
  useDefaults: true,
  $data: true, // required for ajv-keywords
  defaultLanguage: 'en',
};

export default ({ inputSchema, outputSchema, ajvOptions }) => {
  const options = Object.assign({}, defaults, ajvOptions);
  lazyLoadAjv(options);

  const validateInput = inputSchema ? ajv.compile(inputSchema) : null;
  const validateOutput = outputSchema ? ajv.compile(outputSchema) : null;

  return {
    before(handler, next) {
      if (!inputSchema) {
        return next();
      }

      const valid = validateInput(handler.event);

      if (!valid) {
        throw new Error(`Event object failed validation\n${validateInput.errors}`);
      }

      return next();
    },
    after(handler, next) {
      if (!outputSchema || (!handler.response && handler.error)) {
        return next();
      }

      const valid = validateOutput(handler.response);

      if (!valid) {
        throw new Error(`Event object failed validation\n${validateOutput.errors}`);
      }

      return next();
    },
  };
};

function lazyLoadAjv(options) {
  if (shouldInitAjv(options)) {
    initAjv(options);
  }

  return ajv;
}

function shouldInitAjv(options) {
  return !ajv || areConstructorOptionsNew(options);
}

function areConstructorOptionsNew(options) {
  try {
    deepStrictEqual(options, previousConstructorOptions);
  } catch (e) {
    return true;
  }

  return false;
}

function initAjv(options) {
  ajv = new Ajv(options);
  ajvKeywords(ajv);

  previousConstructorOptions = options;
}
