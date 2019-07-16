import middy from '@middy/core';
import validator from '@middy/validator';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import jsonBodyEncoder from 'middleware/custom/json-body-encoder';

/** Wraps a Serverless api function handler with middleware from
 * the Middy framework.
 *
 * @param  {Function} handler The original Serverless handler function.
 * @param  {Object} inputSchema Optional. Event input schema to enforce.
 *
 * @return {Function} The Middy-fyed wrapped function handler.
 */
const middyfy = (handler, inputSchema) => {
  const middleware = middy(handler)
    .use(jsonBodyParser())
    .use(jsonBodyEncoder()) // Stringifies the response body
    .use(cors());

  if (inputSchema) {
    middleware.use(validator({ inputSchema }));
  }

  middleware.use(httpErrorHandler());

  return middleware;
};

export default middyfy;
