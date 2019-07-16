export const userCreatedCB = (user) => ({
  statusCode: 200,
  body: {
    message: 'Success: The user has been created',
    user: user
  }
});
