'use strict';

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
