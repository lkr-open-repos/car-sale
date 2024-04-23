import { ValidationError } from "express-validator";

export class HttpError extends Error {
  code: number;
  validationMessages?: { validationMessages: ValidationError[] };

  constructor(
    message: string,
    code: number,
    validationMessages?: { validationMessages: ValidationError[] }
  ) {
    super(message);
    this.code = code;
    if (validationMessages) {
      this.validationMessages = validationMessages;
    }

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
