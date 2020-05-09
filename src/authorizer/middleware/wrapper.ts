import { Handler, Context } from 'aws-lambda';

import middy from '@middy/core';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import mongooseConnector from 'middleware/custom/mongoose-connector';

import validator from 'authorizer/middleware/custom/validator';

/** Wraps a Serverless api function handler with middleware from
 * the Middy framework.
 *
 * @param  {Function} handler The original Serverless handler function.
 * @param  {Object} inputSchema Optional. Event input schema to enforce.
 * @param  {Boolean} authorized Optional. Whether or not to authenticate the request.
 *
 * @return {Function} The Middy-fyed wrapped function handler.
 */
export default (
  handler: Handler,
  inputSchema: object
): middy.Middy<middy.HandlerLambda, middy.NextFunction, Context> =>
  middy(handler)
    .use(validator({ inputSchema, outputSchema: null, ajvOptions: null }))
    .use(doNotWaitForEmptyEventLoop({ runOnBefore: true, runOnError: true }))
    .use(
      mongooseConnector({
        databaseURI: process.env.MONGODB_URI,
      })
    );
