import { Slot, ISlot } from "../models/slotModel";

interface SlotResponse {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  remainingCapacity: number;
}

function toSlotResponse(slot: ISlot): SlotResponse {
  return {
    id: slot.id.toString(),
    title: slot.title,
    date: slot.date,
    startTime: slot.startTime,
    endTime: slot.endTime,
    capacity: slot.capacity,
    bookedCount: slot.bookedCount,
    remainingCapacity: slot.remainingCapacity,
  };
}

export async function getAllSlots(): Promise<SlotResponse[]> {
  const slots = await Slot.find().sort({ date: 1, startTime: 1 });
  return slots.map(toSlotResponse);
}