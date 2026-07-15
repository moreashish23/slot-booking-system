"use client";

import { Slot } from "@/types";
import { formatSlotDate, formatTimeRange } from "@/utils/format";
import { Button } from "./Button";

interface SlotCardProps {
  slot: Slot;
  isPending: boolean;
  onBook: (slotId: string) => void;
}

function gaugeColor(ratio: number): string {
  if (ratio >= 1) return "bg-danger-500";
  if (ratio >= 0.7) return "bg-signal-500";
  return "bg-good-500";
}

export function SlotCard({ slot, isPending, onBook }: SlotCardProps) {
  const ratio = slot.capacity > 0 ? slot.bookedCount / slot.capacity : 1;
  const isFull = slot.remainingCapacity <= 0;

  return (
    <div className="flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-ink-900">{slot.title}</h3>
        {isFull && (
          <span className="shrink-0 rounded-full bg-danger-500/10 px-2.5 py-1 text-xs font-medium text-danger-500">
            Full
          </span>
        )}
      </div>

      <p className="mt-1 text-sm text-ink-400">{formatSlotDate(slot.date)}</p>
      <p className="mt-0.5 font-mono text-sm text-ink-600">
        {formatTimeRange(slot.startTime, slot.endTime)}
      </p>

      {/* Signature element: capacity gauge — a visual readout of the
          quantitative fact that actually drives every decision on this
          card (can I book this or not), rather than a decorative badge. */}
      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
          <div
            className={`h-full rounded-full transition-all duration-300 ${gaugeColor(ratio)}`}
            style={{ width: `${Math.min(ratio, 1) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex items-baseline justify-between font-mono text-xs text-ink-400">
          <span>
            {slot.bookedCount}/{slot.capacity} booked
          </span>
          <span className={isFull ? "text-danger-500" : "text-ink-600"}>
            {slot.remainingCapacity} left
          </span>
        </div>
      </div>

      <Button
        className="mt-5 w-full"
        variant={isFull ? "secondary" : "primary"}
        disabled={isFull}
        isLoading={isPending}
        onClick={() => onBook(slot.id)}
      >
        {isFull ? "Slot full" : "Book slot"}
      </Button>
    </div>
  );
}
