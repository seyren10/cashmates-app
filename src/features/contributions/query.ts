import { queryOptions } from "@tanstack/react-query";
import { getContributions } from "./api";

export const getContributionsQueryOptions = (savingsGoalId: number) =>
  queryOptions({
    queryKey: ["contributions", savingsGoalId],
    queryFn: () => getContributions(savingsGoalId),
  });
