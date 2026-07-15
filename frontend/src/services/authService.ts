import { api } from "./api";
import { ApiSuccessResponse, AuthResponseData } from "@/types";

export async function loginRequest(
  email: string,
  password: string
): Promise<AuthResponseData> {
  const res = await api.post<ApiSuccessResponse<AuthResponseData>>(
    "/auth/login",
    { email, password }
  );
  return res.data.data;
}

export async function registerRequest(
  name: string,
  email: string,
  password: string
): Promise<AuthResponseData> {
  const res = await api.post<ApiSuccessResponse<AuthResponseData>>(
    "/auth/register",
    { name, email, password }
  );
  return res.data.data;
}
