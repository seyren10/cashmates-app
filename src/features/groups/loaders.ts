import { queryClient } from "@/services/query-client";
import { getGroupsQueryOptions } from "./query";

export const getGroupsLoader = async () => {
  await queryClient.ensureQueryData(getGroupsQueryOptions());
};
