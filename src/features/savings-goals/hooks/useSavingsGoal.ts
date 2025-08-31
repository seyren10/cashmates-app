import { useRouteLoaderData } from "react-router";
import type { getSavingsGoalLoader } from "../loaders";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getSavingsGoalQueryOptions } from "../query";

export const useSavingsGoal = () => {
  const savingsGoalId =
    useRouteLoaderData<Awaited<ReturnType<typeof getSavingsGoalLoader>>>(
      "savings-goal-show"
    );

  if (!savingsGoalId)
    throw new Error(
      "useSavingsGoal must be used within a route that provides savingsGoalId"
    );

  const { data } = useSuspenseQuery(getSavingsGoalQueryOptions(savingsGoalId));

  return data;
};
