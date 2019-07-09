'use strict';

import middy from '@middy/core';
import validator from '@middy/validator';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';

import jsonBodyEncoder from 'middleware/custom/json-body-encoder';

const middyfy = (handler, inputSchema) => {
  const middleware = middy(handler)
    .use(jsonBodyParser())
    .use(jsonBodyEncoder())
    .use(cors());

  if (inputSchema) {
    middleware.use(validator({ inputSchema }));
  }

  middleware.use(httpErrorHandler());

  return middleware;
};

export default middyfy;
