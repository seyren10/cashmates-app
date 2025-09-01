import { useRouteLoaderData } from "react-router";
import type { getContributionsLoader } from "../loaders";
import { useSuspenseQueries } from "@tanstack/react-query";
import { getContributionsQueryOptions } from "../query";

export const useContributions = () => {
  const savingsGoalId =
    useRouteLoaderData<Awaited<ReturnType<typeof getContributionsLoader>>>(
      "contributions"
    );
  const { data } = useSuspenseQueries({
    queries: [getContributionsQueryOptions(savingsGoalId || 0)],
  });
};
