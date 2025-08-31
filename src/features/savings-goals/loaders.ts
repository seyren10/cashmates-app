import { queryClient } from "@/services/query-client";
import type { LoaderFunctionArgs } from "react-router";
import { getSavingsGoalQueryOptions } from "./query";

export const getSavingsGoalLoader = async ({ params }: LoaderFunctionArgs) => {
  const { savingsGoalId } = params;
  if (!savingsGoalId) throw new Error("No savings goal id provided");

  await queryClient.ensureQueryData(
    getSavingsGoalQueryOptions(Number(savingsGoalId))
  );

  return Number(savingsGoalId);
};
