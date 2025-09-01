import { httpClient } from "@/services/axios";
import type { Contribution } from "./type";

export const getContributions = async (savingsGoalId: number) => {
  const res = await httpClient.get<Contribution[]>(
    `/api/savings-goals/${savingsGoalId}/contributions`
  );

  return res.data;
};
