import { Router } from "express";
import {
  createBooking,
  listMyBookings,
  removeBooking,
} from "../controllers/bookingController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  bookSlotValidator,
  cancelBookingValidator,
} from "../validators/bookingValidator";
import { validateRequest } from "../middlewares/validateMiddleware";

const router = Router();

router.get("/me", authMiddleware, listMyBookings);
router.delete(
  "/:id",
  authMiddleware,
  cancelBookingValidator,
  validateRequest,
  removeBooking
);

export default router;