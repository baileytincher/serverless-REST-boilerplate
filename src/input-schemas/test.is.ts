export default {
  type: 'object',
  required: ['headers'],
  properties: {
    headers: {
      type: 'object',
      properties: {
        Authorization: {
          type: 'string',
        },
      },
    },
  },
};
