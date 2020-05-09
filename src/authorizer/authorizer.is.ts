export const optionalAuthorizerInputSchema = {
  type: 'object',
  required: ['methodArn'],
  properties: {
    authorizationToken: {
      type: 'string',
    },
    methodArn: {
      type: 'string',
    },
  },
};

export const requiredAuthorizerInputSchema = {
  type: 'object',
  required: ['authorizationToken', 'methodArn'],
  properties: {
    authorizationToken: {
      type: 'string',
    },
    methodArn: {
      type: 'string',
    },
  },
};
