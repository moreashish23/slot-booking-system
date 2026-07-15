import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { getAllSlots } from "../services/slotService";

export const listSlots = asyncHandler(async (_req: Request, res: Response) => {
  const slots = await getAllSlots();

  res.status(200).json(new ApiResponse("Slots fetched successfully", slots));
});