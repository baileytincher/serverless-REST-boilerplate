'use strict';

/** Middleware for the Middy framework that stringifies the
 * response body for a Serverless REST api.
 *
 * @return {Object} The middleware.
 */
const jsonBodyEncoder = () => ({
  after: (handler, next) => {
    if (
      handler.hasOwnProperty('response') &&
      handler.response.hasOwnProperty('body') &&
      typeof handler.response.body !== 'string'
    ) {
      handler.response.body = JSON.stringify(handler.response.body);
    }

    return next();
  }
});

export default jsonBodyEncoder;
