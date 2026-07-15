import { Schema, model, Document } from "mongoose";

export interface ISlot extends Document {
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  createdAt: Date;
  updatedAt: Date;
  remainingCapacity: number;
}

const slotSchema = new Schema<ISlot>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    bookedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


slotSchema.virtual("remainingCapacity").get(function (this: ISlot) {
  return this.capacity - this.bookedCount;
});

export const Slot = model<ISlot>("Slot", slotSchema);