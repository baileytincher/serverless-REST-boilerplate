'use strict';

import dynamoose, { Schema } from 'dynamoose';
if (process.env.IS_OFFLINE) {
  dynamoose.local();
}

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 8;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      hashKey: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    saveUnknown: false
  }
);

UserSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
};

UserSchema.methods.getReturnableUser = function() {
  return {
    username: this.username,
  };
};

const User = dynamoose.model(process.env.USERS_TABLE_NAME, UserSchema, {
  create: false,
  waitForActive: false
});

export default User;
