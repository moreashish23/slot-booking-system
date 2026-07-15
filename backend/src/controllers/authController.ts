import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { registerUser, loginUser } from "../services/authService";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const result = await registerUser({ name, email, password });

  res.status(201).json(new ApiResponse("User registered successfully", result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginUser({ email, password });

  res.status(200).json(new ApiResponse("Login successful", result));
});