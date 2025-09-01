import { queryClient } from "@/services/query-client";
import type { LoaderFunctionArgs } from "react-router";
import { getContributionsQueryOptions } from "./query";

export const getContributionsLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const { savingsGoalId } = params;

  if (!savingsGoalId) throw new Error("No savings goal id provided");

  await queryClient.ensureQueryData(
    getContributionsQueryOptions(Number(savingsGoalId))
  );

  return Number(savingsGoalId);
};
