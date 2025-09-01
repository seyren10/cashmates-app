import type { getContributionsLoader } from "@/features/contributions/loaders";
import { getContributionsQueryOptions } from "@/features/contributions/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router";
import ContributionsCard from "./components/contributions-card";

function ContributionsPageIndex() {
  const savingsGoalId =
    useLoaderData<Awaited<ReturnType<typeof getContributionsLoader>>>();
  const { data: contributions } = useSuspenseQuery(
    getContributionsQueryOptions(savingsGoalId)
  );
  return (
    <div className="space-y-2">
      <ContributionsCard contributions={contributions} />
    </div>
  );
}

export default ContributionsPageIndex;
