import { Loader2 } from "lucide-react";

export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
      <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function SlotCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="h-4 w-2/3 rounded bg-ink-100" />
      <div className="mt-3 h-3 w-1/3 rounded bg-ink-100" />
      <div className="mt-5 h-2 w-full rounded-full bg-ink-100" />
      <div className="mt-5 h-9 w-full rounded-lg bg-ink-100" />
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink-100 bg-white p-5 shadow-card">
      <div className="h-4 w-1/2 rounded bg-ink-100" />
      <div className="mt-3 h-3 w-1/3 rounded bg-ink-100" />
      <div className="mt-4 h-9 w-28 rounded-lg bg-ink-100" />
    </div>
  );
}
