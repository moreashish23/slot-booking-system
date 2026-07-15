import { Router, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res
    .status(200)
    .json(new ApiResponse("Server is healthy", { uptime: process.uptime() }));
});

export default router;