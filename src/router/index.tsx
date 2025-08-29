import { getUserQueryOptions } from "@/features/auth/query";
import { getGroupsQueryOptions } from "@/features/groups/query";
import { Layout } from "@/layout";
import Login from "@/pages/auth/login";
import { queryClient } from "@/services/query-client";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: async () => {
      const user = await queryClient.ensureQueryData(getUserQueryOptions());
      await queryClient.ensureQueryData(getGroupsQueryOptions());

      return user;
    },
    Component: Layout,
    children: [
      {
        index: true,
        lazy: {
          Component: async () => (await import("@/pages/dashboard")).default,
        },
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);
