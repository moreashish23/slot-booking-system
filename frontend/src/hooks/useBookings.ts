"use client";

import { useCallback, useEffect, useState } from "react";
import { Booking } from "@/types";
import { fetchMyBookings, cancelBookingRequest } from "@/services/bookingService";
import { getErrorMessage } from "@/utils/apiError";

interface UseBookingsResult {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  pendingBookingId: string | null;
  refreshBookings: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
}

export function useBookings(): UseBookingsResult {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingBookingId, setPendingBookingId] = useState<string | null>(null);

  const refreshBookings = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchMyBookings();
      setBookings(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  async function cancelBooking(bookingId: string): Promise<boolean> {
    if (pendingBookingId) return false;

    setPendingBookingId(bookingId);
    try {
      await cancelBookingRequest(bookingId);
      await refreshBookings();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setPendingBookingId(null);
    }
  }

  return {
    bookings,
    isLoading,
    error,
    pendingBookingId,
    refreshBookings,
    cancelBooking,
  };
}
