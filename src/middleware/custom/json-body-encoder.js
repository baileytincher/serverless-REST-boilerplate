'use strict';

const jsonBodyEncoder = () => ({
  after: ({ response: { body } }, next) => {
    if (typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return next();
  }
});

export default jsonBodyEncoder;
