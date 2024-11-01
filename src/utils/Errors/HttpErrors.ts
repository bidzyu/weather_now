export class HttpError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export class HttpTimeoutError extends HttpError {
  constructor(message: string) {
    super(message);
    this.name = 'HttpTimeoutError';
  }
}
