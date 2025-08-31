import { useRouteLoaderData } from "react-router";
import type { getGroupLoader } from "../loaders";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupQueryOptions } from "../query";

export const useGroup = () => {
  const groupId =
    useRouteLoaderData<Awaited<ReturnType<typeof getGroupLoader>>>(
      "group-show"
    );

  if (!groupId) throw new Error("useGroup must be used within group route");

  const { data } = useSuspenseQuery(getGroupQueryOptions(groupId));
  return data;
};
