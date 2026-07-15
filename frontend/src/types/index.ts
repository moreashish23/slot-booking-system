export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponseData {
  token: string;
  user: User;
}

export interface Slot {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  bookedCount: number;
  remainingCapacity: number;
}

export type BookingStatus = "ACTIVE" | "CANCELLED";

export interface Booking {
  id: string;
  slot: string;
  status: BookingStatus;
  createdAt: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}
