export default class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
  }
}
