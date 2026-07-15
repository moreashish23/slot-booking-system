export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: string[];

  constructor(statusCode: number, message: string, errors: string[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}