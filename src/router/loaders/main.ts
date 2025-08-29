import { getUserQueryOptions } from "@/features/auth/query";
import { getGroupsQueryOptions } from "@/features/groups/query";
import { queryClient } from "@/services/query-client";
import { AxiosError } from "axios";
import { redirect } from "react-router";

export const mainLoader = async () => {
  try {
    const user = await queryClient.ensureQueryData(getUserQueryOptions());
    await queryClient.ensureQueryData(getGroupsQueryOptions());

    return user;
  } catch (error) {
    if (error instanceof AxiosError) return redirect("/login");
  }
};
