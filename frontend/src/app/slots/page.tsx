"use client";

import toast from "react-hot-toast";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { SlotCard } from "@/components/SlotCard";
import { SlotCardSkeleton } from "@/components/Loader";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { useSlots } from "@/hooks/useSlots";
import { getErrorMessage } from "@/utils/apiError";
import { CalendarX2 } from "lucide-react";

function SlotsPageContent() {
  const { slots, isLoading, error, pendingSlotId, refreshSlots, bookSlot } = useSlots();

  async function handleBook(slotId: string) {
    try {
      await bookSlot(slotId);
      toast.success("Slot booked");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <PageHeader
        eyebrow="Available now"
        title="Slots"
        description="Pick a time that works and reserve it — you can hold up to 2 active bookings at once."
      />

      <div className="mt-8">
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SlotCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && error && <ErrorState message={error} onRetry={refreshSlots} />}

        {!isLoading && !error && slots.length === 0 && (
          <EmptyState
            icon={<CalendarX2 className="h-5 w-5" aria-hidden />}
            title="No slots available right now"
            description="Check back later — new slots are added regularly."
          />
        )}

        {!isLoading && !error && slots.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                isPending={pendingSlotId === slot.id}
                onBook={handleBook}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SlotsPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <SlotsPageContent />
    </ProtectedRoute>
  );
}
