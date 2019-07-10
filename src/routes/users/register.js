'use strict';

import middyfy from 'middleware/wrapper';

import RegisterInputSchema from 'input-schemas/users/register-is';

import User from 'models/User';

import { internalServerErrorCB } from 'callbacks/shared';
import { userCreatedCB } from 'callbacks/users/register-cb';

const handler = async ({ body: { user } }) => {
  let newUser;
  try {
    newUser = new User(user);
  } catch (err) {
    console.log(err);
    return internalServerErrorCB;
  }

  try {
    await newUser.setPassword(user.password);
  } catch (err) {
    console.log(err);
    return internalServerErrorCB;
  }

  try {
    const savedUser = await newUser.save();
    return userCreatedCB(savedUser);
  } catch (err) {
    console.log(err);
    return internalServerErrorCB;
  }
};

export default middyfy(handler, RegisterInputSchema);
