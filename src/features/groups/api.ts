import { httpClient } from "@/services/axios";
import type { CreateGroupPayload, Group, UpdateGroupPayload } from "./type";

export const getGroups = async () => {
  const res = await httpClient.get<Group[]>("/api/groups");
  return res.data;
};

export const createGroup = async (payload: CreateGroupPayload) => {
  const res = await httpClient.post<Group>("/api/groups", payload);
  return res.data;
};

export const updateGroup = async (
  groupId: number,
  payload: UpdateGroupPayload
) => {
  const res = await httpClient.put<Group>(`/api/groups/${groupId}`, payload);
  return res.data;
};

export const deleteGroup = async (groupId: number) => {
  const res = await httpClient.delete<void>(`/api/groups/${groupId}`);
  return res.data;
};
