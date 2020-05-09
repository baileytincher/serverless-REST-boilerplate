import { ReturnableUser } from 'models/User.d';

import mongoose from 'mongoose';

import { validateTokenAndReturnTokenId } from 'utils/auth';
import { TokenType } from 'utils/auth.d';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  googleUserId: String,
  developerOnlyUserId: String,
  allowExplicit: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

/** Converts the user model to a JSON compatible Object
 * and removes sensitive information to be suitable for
 * returning to non-trusted entities.
 *
 * @return {Object} The (skimmed) user's metadata.
 */
UserSchema.methods.getReturnableUser = function (): ReturnableUser {
  return {
    username: this.username,
    email: this.email,
    allowExplicit: this.allowExplicit,
    dateCreated: this.dateCreated,
  };
};

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of Apple, Google, Facebook
 *
 * @return {Object} The user object
 */
UserSchema.statics.getUserFromToken = async function (
  token: string,
  tokenType: TokenType = 'Google'
): Promise<ReturnableUser | null> {
  const tokenId: string = await validateTokenAndReturnTokenId(token, tokenType);
  let idName;
  switch (tokenType) {
    case 'Google':
      idName = 'googleUserId';
      break;
    case 'DeveloperOnly':
      idName = 'developerOnlyUserId';
      break;
    default:
      throw Error('Unknown token type');
  }
  return (await this.findOne({ [idName]: tokenId }))?.getReturnableUser();
};

/** Queries the database for the username or email
 * provided in the arguments and checks if they are
 * inside the database.
 *
 * @param {String} username A potential username
 * @param {String} email A potential email
 *
 * @return {User} The user
 */
UserSchema.statics.findUser = async function (username = undefined, email = undefined) {
  const user = await this.findOne({ $or: [{ username: username }, { email: email }] });

  if (user) {
    return user;
  }
};

/** Queries the database for the username or email
 * provided in the arguments and checks if they are
 * inside the database.
 *
 * @param {String} username A potential username
 * @param {String} email A potential email
 *
 * @return {Array} The name of the fields with a match in the database
 */
UserSchema.statics.userExists = async function (username = undefined, email = undefined) {
  const fields = [];

  const users = await this.find({ $or: [{ username: username }, { email: email }] });

  users.map((user) => {
    if (user.username === username) fields.push('username');
    if (user.email === email) fields.push('email');
  });

  return fields;
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
