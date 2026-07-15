import { api } from "./api";
import { ApiSuccessResponse, Booking } from "@/types";

export async function fetchMyBookings(): Promise<Booking[]> {
  const res = await api.get<ApiSuccessResponse<Booking[]>>("/bookings/me");
  return res.data.data;
}

export async function cancelBookingRequest(bookingId: string): Promise<Booking> {
  const res = await api.delete<ApiSuccessResponse<Booking>>(
    `/bookings/${bookingId}`
  );
  return res.data.data;
}
