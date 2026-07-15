import { Router } from "express";
import { listSlots } from "../controllers/slotController";
import { createBooking } from "../controllers/bookingController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { bookSlotValidator } from "../validators/bookingValidator";
import { validateRequest } from "../middlewares/validateMiddleware";

const router = Router();

router.get("/", authMiddleware, listSlots);
router.post(
  "/:id/book",
  authMiddleware,
  bookSlotValidator,
  validateRequest,
  createBooking
);

export default router;