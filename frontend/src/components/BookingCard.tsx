"use client";

import { Booking, Slot } from "@/types";
import { formatBookedAt, formatSlotDate, formatTimeRange } from "@/utils/format";
import { Button } from "./Button";

interface BookingCardProps {
  booking: Booking;
  slot: Slot | undefined;
  isPending: boolean;
  onCancel: (bookingId: string) => void;
}

export function BookingCard({ booking, slot, isPending, onCancel }: BookingCardProps) {
  const isActive = booking.status === "ACTIVE";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-ink-900">
            {slot ? slot.title : "Slot no longer listed"}
          </h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isActive
                ? "bg-good-500/10 text-good-500"
                : "bg-ink-100 text-ink-400"
            }`}
          >
            {isActive ? "Active" : "Cancelled"}
          </span>
        </div>
        {slot && (
          <p className="mt-1 text-sm text-ink-400">
            {formatSlotDate(slot.date)} ·{" "}
            <span className="font-mono">{formatTimeRange(slot.startTime, slot.endTime)}</span>
          </p>
        )}
        <p className="mt-1 text-xs text-ink-400">
          Booked {formatBookedAt(booking.createdAt)}
        </p>
      </div>

      {isActive && (
        <Button
          variant="danger"
          isLoading={isPending}
          onClick={() => onCancel(booking.id)}
          className="sm:shrink-0"
        >
          Cancel booking
        </Button>
      )}
    </div>
  );
}
