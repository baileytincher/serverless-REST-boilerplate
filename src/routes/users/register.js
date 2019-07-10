'use strict';

import middyfy from 'middleware/wrapper';

import RegisterInputSchema from 'input-schemas/users/register-is';

import User from 'models/User';

import { internalServerErrorCB } from 'callbacks/shared';
import { userCreatedCB } from 'callbacks/users/register-cb';
import { userAlreadyExistsErrorCB } from 'callbacks/users/shared';

const handler = async ({ body: { user } }) => {
  const password = user.password;
  delete user.password;

  let newUser;
  try {
    newUser = new User(user);
  } catch (err) {
    console.log(err);
    return internalServerErrorCB;
  }

  try {
    await newUser.setPassword(password);
  } catch (err) {
    console.log(err);
    return internalServerErrorCB;
  }

  try {
    await newUser.save({ overwrite: false });
    return userCreatedCB(newUser.getReturnableUser());
  } catch (err) {
    if (err.code === 'ConditionalCheckFailedException') {
      return userAlreadyExistsErrorCB(user.username);
    } else {
      console.log(err);
      return internalServerErrorCB;
    }
  }
};

export default middyfy(handler, RegisterInputSchema);
