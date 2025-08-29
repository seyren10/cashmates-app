import { queryOptions } from "@tanstack/react-query";
import { getGroups } from "./api";

export const getGroupsQueryOptions = () =>
  queryOptions({ queryKey: ["groups", "list"], queryFn: getGroups });
