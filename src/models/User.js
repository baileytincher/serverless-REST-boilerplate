import dynamoose, { Schema } from 'dynamoose';
if (process.env.IS_OFFLINE) {
  dynamoose.local();
}

import bcrypt from 'bcryptjs';
const SALT_ROUNDS = 8; // For hashing a password

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
    saveUnknown: false // Do not save unknown data in Database
  }
);

/** Changes the password of the (local copy of) user model.
 *
 * @param {String} password The plain text password.
 */
UserSchema.methods.setPassword = async function(password) {
  this.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
};

/** Converts the user model to a JSON compatible Object
 * and removes sensitive information to be suitable for
 * returning to non-trusted entities.
 *
 * @return {Object} The (skimmed) user's metadata.
 */
UserSchema.methods.getReturnableUser = function() {
  return {
    username: this.username
  };
};

const User = dynamoose.model(process.env.USERS_TABLE_NAME, UserSchema, {
  create: false, // Do not create a new table
  waitForActive: false // Do not wait for a table to be created
});

export default User;
