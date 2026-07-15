import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export function validateRequest(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
   
    const messages = errors
      .array({ onlyFirstError: true })
      .map((err) => err.msg);
    next(new ApiError(400, "Validation failed", messages));
    return;
  }

  next();
}