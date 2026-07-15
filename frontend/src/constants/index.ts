export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const TOKEN_STORAGE_KEY = "auth_token";
export const USER_STORAGE_KEY = "auth_user";

export const MAX_ACTIVE_BOOKINGS_PER_USER = 2;
