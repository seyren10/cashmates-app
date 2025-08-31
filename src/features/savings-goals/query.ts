import { queryOptions } from "@tanstack/react-query";
import { getSavingsGoal } from "./api";

export const getSavingsGoalQueryOptions = (savingsGoalId: number) =>
  queryOptions({
    queryKey: ["savingsGoal", savingsGoalId],
    queryFn: () => getSavingsGoal(savingsGoalId),
  });
