import { httpClient } from "@/services/axios";
import type { Group } from "./type";

export const getGroups = async () => {
  const res = await httpClient.get<Group[]>("/api/groups");
  return res.data;
};
