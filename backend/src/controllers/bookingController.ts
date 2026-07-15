import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import {
  bookSlot,
  getMyBookings,
  cancelBooking,
} from "../services/bookingService";

interface SlotIdParams extends ParamsDictionary {
  id: string;
}

interface BookingIdParams extends ParamsDictionary {
  id: string;
}

export const createBooking = asyncHandler(
  async (req: Request<SlotIdParams>, res: Response) => {
    const userId = req.user?.userId;
    const { id: slotId } = req.params;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const booking = await bookSlot(userId, slotId);

    res.status(201).json(new ApiResponse("Slot booked successfully", booking));
  }
);

export const listMyBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const bookings = await getMyBookings(userId);

    res.status(200).json(new ApiResponse("Bookings fetched successfully", bookings));
  }
);

export const removeBooking = asyncHandler(
  async (req: Request<BookingIdParams>, res: Response) => {
    const userId = req.user?.userId;
    const { id: bookingId } = req.params;

    if (!userId) {
      throw new ApiError(401, "Authentication required");
    }

    const booking = await cancelBooking(userId, bookingId);

    res.status(200).json(new ApiResponse("Booking cancelled successfully", booking));
  }
);