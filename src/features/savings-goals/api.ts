import { httpClient } from "@/services/axios";
import type { SavingsGoalShow } from "./type";

export const getSavingsGoal = async (savingsGoalId: number) => {
  const res = await httpClient.get<SavingsGoalShow>(
    `/api/savings-goals/${savingsGoalId}`
  );
  return res.data;
};
