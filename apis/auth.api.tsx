import http from "../utils/http";

export const loginAPI = (phone: string, password: string) =>
  http.post("/v1/auth/login", { phone, password });
