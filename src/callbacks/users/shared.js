export const userAlreadyExistsErrorCB = (input) => ({
  statusCode: 400,
  body: {
    message: 'User already exists.',
    input: input
  }
});
