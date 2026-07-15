import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types";

function isAxiosApiError(
  error: unknown
): error is AxiosError<ApiErrorResponse> {
  return (
    !!error &&
    typeof error === "object" &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true &&
    !!(error as AxiosError<ApiErrorResponse>).response?.data
  );
}

/**
 * Extracts a single human-readable message from a failed request,
 * matching the backend's { success:false, message, errors? } shape.
 */
export function getErrorMessage(error: unknown): string {
  if (isAxiosApiError(error)) {
    return error.response!.data.message || "Something went wrong";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

/**
 * Extracts the full errors[] array (field-level validation messages)
 * when present, falling back to the top-level message.
 */
export function getErrorMessages(error: unknown): string[] {
  if (isAxiosApiError(error)) {
    const data = error.response!.data;
    if (data.errors && data.errors.length > 0) return data.errors;
    return [data.message];
  }
  return [getErrorMessage(error)];
}

export function getErrorStatus(error: unknown): number | undefined {
  if (isAxiosApiError(error)) return error.response?.status;
  return undefined;
}
