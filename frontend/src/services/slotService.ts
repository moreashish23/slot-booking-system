import { api } from "./api";
import { ApiSuccessResponse, Slot, Booking } from "@/types";

export async function fetchSlots(): Promise<Slot[]> {
  const res = await api.get<ApiSuccessResponse<Slot[]>>("/slots");
  return res.data.data;
}

export async function bookSlotRequest(slotId: string): Promise<Booking> {
  const res = await api.post<ApiSuccessResponse<Booking>>(
    `/slots/${slotId}/book`
  );
  return res.data.data;
}
