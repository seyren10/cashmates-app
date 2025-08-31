import { queryOptions } from "@tanstack/react-query";
import { getGroup, getGroups } from "./api";

export const getGroupsQueryOptions = () =>
  queryOptions({ queryKey: ["groups", "list"], queryFn: getGroups });

export const getGroupQueryOptions = (groupId: number) =>
  queryOptions({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup(groupId),
  });
