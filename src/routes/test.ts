import middyfy from 'middleware/wrapper.ts';
import InputSchema from 'input-schemas/test.is';
import { HTTPRawHandler } from './handler';

const _handler: HTTPRawHandler = async (event) => {
  return {
    message: 'Success!',
    auth: event.requestContext.authorizer,
  };
};

export const handler = middyfy(_handler, InputSchema);
