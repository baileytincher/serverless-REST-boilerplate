import { TokenType, AuthInfo, Token } from 'utils/auth.d';
export * from 'utils/auth.d';
import { Buffer } from 'safe-buffer';

import {
  OAuth2Client as GoogleOAuth2Client,
  LoginTicket as GoogleLoginTicket,
} from 'google-auth-library';
let googleOAuth2Client;
const googleOAuth2Audience = [
  process.env.GOOGLE_AUTH_ANDROID_CLIENT_ID,
  process.env.GOOGLE_AUTH_IOS_CLIENT_ID,
];
if (process.env.EXECUTION_STAGE === 'dev') {
  googleOAuth2Client = new GoogleOAuth2Client(
    process.env.GOOGLE_AUTH_WEB_CLIENT_ID,
    process.env.GOOGLE_AUTH_WEB_CLIENT_SECRET
  );
  googleOAuth2Audience.push(process.env.GOOGLE_AUTH_WEB_CLIENT_ID);
} else {
  googleOAuth2Client = new GoogleOAuth2Client(process.env.GOOGLE_AUTH_ANDROID_CLIENT_ID);
}

const decodeToken = (encodedToken: string): Token => {
  const rawToken = Buffer.from(encodedToken, 'base64').toString();
  const [type, value] = rawToken.split(':', 2);
  return { type: type as TokenType, value };
};

export const decodeBasicAuthHeader = (auth: string): Token => decodeToken(auth.substr(6));

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of Apple, Google, Facebook
 *
 * @return {Object} The string user _id if found.
 */
export const validateTokenAndReturnTokenId = async (
  token: string,
  tokenType: TokenType = 'Google'
): Promise<string | null> => {
  switch (tokenType) {
    case 'Apple':
      break;

    case 'Facebook':
      break;

    case 'Google':
      let ticket: GoogleLoginTicket;
      try {
        ticket = await googleOAuth2Client.verifyIdToken({
          idToken: token,
          audience: googleOAuth2Audience,
        });
      } catch (err) {
        console.error(err);
        return null;
      }

      return ticket.getPayload().sub;

    case 'DeveloperOnly':
      if (process.env.EXECUTION_STAGE === 'dev') {
        return token;
      }

    default:
      throw Error('Unknown token type');
  }
};

/** Validates a proposed token for the user.
 *
 * @param {String} token
 * @param {String} tokenType one of Apple, Google, Facebook
 *
 * @return {Object} The string user _id if found.
 */
export const validateTokenAndReturnAuthInfo = async (
  token: string,
  tokenType: TokenType = 'Google'
): Promise<AuthInfo | null> => {
  switch (tokenType) {
    case 'Apple':
      break;

    case 'Facebook':
      break;

    case 'Google':
      let ticket: GoogleLoginTicket;
      try {
        ticket = await googleOAuth2Client.verifyIdToken({
          idToken: token,
          audience: googleOAuth2Audience,
        });
      } catch (err) {
        console.error(err);
        return null;
      }

      const payload = ticket.getPayload();
      return {
        googleUserId: payload.sub,
        email: payload.email,
        email_verified: payload.email_verified,
      };

    case 'DeveloperOnly':
      if (process.env.EXECUTION_STAGE === 'dev') {
        return {
          developerOnlyUserId: token,
          email: `${token}@test.overheardapp.com`,
          email_verified: true,
        };
      }

    default:
      throw Error('Unknown token type');
  }
};
