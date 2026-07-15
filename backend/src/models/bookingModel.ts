import { Schema, model, Document, Types } from "mongoose";
import { BookingStatus } from "../constants/bookingConstants";

export interface IBooking extends Document {
  user: Types.ObjectId;
  slot: Types.ObjectId;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(BookingStatus),
      default: BookingStatus.ACTIVE,
      required: true,
    },
  },
  { timestamps: true }
);


bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ user: 1, slot: 1, status: 1 });

export const Booking = model<IBooking>("Booking", bookingSchema);