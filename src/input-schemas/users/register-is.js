'use strict';

const MIN_USERNAME_LENGTH = 4;
const MAX_USERNAME_LENGTH = 16;

// https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username#comment16037047_12018245
const USERNAME_PATTERN =
  '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 80;

const RegisterInputSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['user'],
      additionalProperties: false,
      properties: {
        user: {
          type: 'object',
          required: ['username', 'password'],
          additionalProperties: false,
          properties: {
            username: {
              type: 'string',
              minLength: MIN_USERNAME_LENGTH,
              maxLength: MAX_USERNAME_LENGTH,
              pattern: USERNAME_PATTERN
            },
            password: {
              type: 'string',
              minLength: MIN_PASSWORD_LENGTH,
              maxLength: MAX_PASSWORD_LENGTH
            }
          }
        }
      }
    }
  }
};

export default RegisterInputSchema;
