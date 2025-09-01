import { httpClient } from "@/services/axios";
import type { LoginCredential, User } from "./type";
import { queryClient } from "@/services/query-client";

export const getUser = async () => {
  const res = await httpClient.get<User>("/api/user");

  return res.data;
};

export const logoutUser = async () => {
  await httpClient.post("/logout");
  queryClient.removeQueries();
};

export const login = async (credentials: LoginCredential) => {
  await httpClient.post("/login", credentials);
};
