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

export function getErrorMessage(error: unknown): string {
  if (isAxiosApiError(error)) {
    return error.response!.data.message || "Something went wrong";
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

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
