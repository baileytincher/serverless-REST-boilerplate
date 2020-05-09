import {
  APIGatewayTokenAuthorizerWithContextHandler,
  APIGatewayAuthorizerWithContextResult,
} from 'aws-lambda';

import authMiddyfy from 'authorizer/middleware/wrapper';
import {
  requiredAuthorizerInputSchema,
  optionalAuthorizerInputSchema,
} from 'authorizer/authorizer.is';

import { decodeBasicAuthHeader } from 'utils/auth';
import User from 'models/User';
import { ReturnableUser } from 'models/User.d';
import { Token } from 'utils/auth';

const generatePolicy = (
  principalId: string,
  methodArn: string,
  effect: 'Allow' | 'Deny',
  user?: ReturnableUser | null
): APIGatewayAuthorizerWithContextResult<ReturnableUser | null> => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    },
    context: user,
  };
};

const _required: APIGatewayTokenAuthorizerWithContextHandler<ReturnableUser> = async (
  event,
  context
) => {
  const token: Token = decodeBasicAuthHeader(event.authorizationToken);
  const user: ReturnableUser | null = await User.getUserFromToken(
    token.value,
    token.type
  );

  if (user !== null) {
    return generatePolicy(user.username, event.methodArn, 'Allow', user);
  } else {
    context.fail('Unauthorized');
  }
};

export const requiredHandler = authMiddyfy(_required, requiredAuthorizerInputSchema);

const _optional: APIGatewayTokenAuthorizerWithContextHandler<ReturnableUser | null> = async (
  event
) => {
  if (!event.authorizationToken) return generatePolicy('null', event.methodArn, 'Allow');

  const token = decodeBasicAuthHeader(event.authorizationToken);
  const user: ReturnableUser | null = await User.getUserFromToken(
    token.value,
    token.type
  );

  return generatePolicy(user?.username || 'null', event.methodArn, 'Allow', user);
};

export const optionalHandler = authMiddyfy(_optional, optionalAuthorizerInputSchema);
