import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwtUtil";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new ApiError(401, "Authentication token missing"));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
}