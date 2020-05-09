export type TokenType = 'Google' | 'DeveloperOnly';

export interface Token {
  type: TokenType;
  value: string;
}

export interface AuthInfo {
  googleUserId?: string;
  developerOnlyUserId?: string;
  email: string;
  email_verified: boolean;
}
