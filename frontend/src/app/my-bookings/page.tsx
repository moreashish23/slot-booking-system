"use client";

import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { BookingCard } from "@/components/BookingCard";
import { BookingCardSkeleton } from "@/components/Loader";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { useBookings } from "@/hooks/useBookings";
import { useSlots } from "@/hooks/useSlots";
import { getErrorMessage } from "@/utils/apiError";
import { CalendarCheck2 } from "lucide-react";

function MyBookingsPageContent() {
  const {
    bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
    pendingBookingId,
    refreshBookings,
    cancelBooking,
  } = useBookings();
  const { slots, refreshSlots } = useSlots();

  const isLoading = bookingsLoading;
  const slotById = new Map(slots.map((slot) => [slot.id, slot]));

  async function handleCancel(bookingId: string) {
    try {
      await cancelBooking(bookingId);
      await refreshSlots();
      toast.success("Booking cancelled");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        eyebrow="Your reservations"
        title="My bookings"
        description="Manage your active and past bookings."
      />

      <div className="mt-8 flex flex-col gap-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => <BookingCardSkeleton key={i} />)}

        {!isLoading && bookingsError && (
          <ErrorState message={bookingsError} onRetry={refreshBookings} />
        )}

        {!isLoading && !bookingsError && bookings.length === 0 && (
          <EmptyState
            icon={<CalendarCheck2 className="h-5 w-5" aria-hidden />}
            title="No bookings yet"
            description="Head over to Slots to reserve your first spot."
          />
        )}

        {!isLoading &&
          !bookingsError &&
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              slot={slotById.get(booking.slot)}
              isPending={pendingBookingId === booking.id}
              onCancel={handleCancel}
            />
          ))}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <MyBookingsPageContent />
    </ProtectedRoute>
  );
}
