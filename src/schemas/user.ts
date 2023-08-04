export interface User {
  email: string;
  password: string;
  username: string;
}

export interface AuthenticatedUser {
  email: string;
  token: string;
  username: string;
}
