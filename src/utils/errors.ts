export class UserAlreadyRegisteredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAlreadyRegisteredError';
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class UserIncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserIncorrectPasswordError';
  }
}
