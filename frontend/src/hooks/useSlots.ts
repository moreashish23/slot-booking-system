"use client";

import { useCallback, useEffect, useState } from "react";
import { Slot } from "@/types";
import { fetchSlots, bookSlotRequest } from "@/services/slotService";
import { getErrorMessage } from "@/utils/apiError";

interface UseSlotsResult {
  slots: Slot[];
  isLoading: boolean;
  error: string | null;
  pendingSlotId: string | null;
  refreshSlots: () => Promise<void>;
  bookSlot: (slotId: string) => Promise<boolean>;
}

export function useSlots(): UseSlotsResult {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingSlotId, setPendingSlotId] = useState<string | null>(null);

  const refreshSlots = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchSlots();
      setSlots(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSlots();
  }, [refreshSlots]);

  // Returns true on success so callers can trigger toasts/refresh elsewhere.
  // Guards against double-click / duplicate requests via pendingSlotId.
  async function bookSlot(slotId: string): Promise<boolean> {
    if (pendingSlotId) return false;

    setPendingSlotId(slotId);
    try {
      await bookSlotRequest(slotId);
      await refreshSlots();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      throw err;
    } finally {
      setPendingSlotId(null);
    }
  }

  return { slots, isLoading, error, pendingSlotId, refreshSlots, bookSlot };
}
