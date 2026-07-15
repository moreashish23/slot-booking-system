import mongoose from "mongoose";
import { Slot } from "../models/slotModel";
import { Booking, IBooking } from "../models/bookingModel";
import { BookingStatus } from "../constants/bookingConstants";
import { ApiError } from "../utils/ApiError";

const MAX_ACTIVE_BOOKINGS_PER_USER = 2;

interface BookingResponse {
  id: string;
  slot: string;
  status: BookingStatus;
  createdAt: Date;
}

function toBookingResponse(booking: IBooking): BookingResponse {
  return {
    id: booking._id.toString(),
    slot: booking.slot.toString(),
    status: booking.status,
    createdAt: booking.createdAt,
  };
}


export async function bookSlot(
  userId: string,
  slotId: string
): Promise<BookingResponse> {

  const activeBookingCount = await Booking.countDocuments({
    user: userId,
    status: BookingStatus.ACTIVE,
  });

  if (activeBookingCount >= MAX_ACTIVE_BOOKINGS_PER_USER) {
    throw new ApiError(
      409,
      "You already have 2 active bookings. Cancel one before booking again."
    );
  }

  
  const existingBooking = await Booking.findOne({
    user: userId,
    slot: slotId,
    status: BookingStatus.ACTIVE,
  });

  if (existingBooking) {
    throw new ApiError(409, "You already have an active booking for this slot");
  }

 
  const updatedSlot = await Slot.findOneAndUpdate(
    {
      _id: slotId,
      $expr: { $lt: ["$bookedCount", "$capacity"] },
    },
    { $inc: { bookedCount: 1 } },
    { new: true }
  );

  if (!updatedSlot) {
   
    const slotExists = await Slot.exists({ _id: slotId });
    if (!slotExists) {
      throw new ApiError(404, "Slot not found");
    }
    throw new ApiError(409, "Slot is full");
  }

  
  try {
    const booking = await Booking.create({
      user: userId,
      slot: slotId,
      status: BookingStatus.ACTIVE,
    });

    return toBookingResponse(booking);
  } catch (error) {
    await Slot.findByIdAndUpdate(slotId, { $inc: { bookedCount: -1 } });
    throw new ApiError(500, "Failed to create booking, please try again");
  }
}

export async function getMyBookings(userId: string): Promise<BookingResponse[]> {
  const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
  return bookings.map(toBookingResponse);
}

export async function cancelBooking(
  userId: string,
  bookingId: string
): Promise<BookingResponse> {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  
  if (booking.user.toString() !== userId) {
    throw new ApiError(403, "You are not allowed to cancel this booking");
  }

  if (booking.status === BookingStatus.CANCELLED) {
    throw new ApiError(409, "Booking is already cancelled");
  }

  booking.status = BookingStatus.CANCELLED;
  await booking.save();

  
  await Slot.findByIdAndUpdate(booking.slot, { $inc: { bookedCount: -1 } });

  return toBookingResponse(booking);
}