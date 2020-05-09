export interface ReturnableUser {
  [index: string]: string | boolean | number;
  username: string;
  email: string;
  allowExplicit: boolean;
}

export type UserId = string | null;
