import { queryClient } from "@/services/query-client";
import { getGroupQueryOptions, getGroupsQueryOptions } from "./query";
import type { LoaderFunctionArgs } from "react-router";
import store from "@/store";
import { setGroup } from "./slice";

export const getGroupsLoader = async () => {
  await queryClient.ensureQueryData(getGroupsQueryOptions());
};

export const getGroupLoader = async ({ params }: LoaderFunctionArgs) => {
  const { groupId } = params;

  if (!groupId) throw new Error("groupId is required");

  const group = await queryClient.ensureQueryData(
    getGroupQueryOptions(+groupId)
  );
  store.dispatch(setGroup(group));

  return +groupId;
};
