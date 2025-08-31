import type { RouteObject } from "react-router";
import { savingsGoalRoutes } from "./savings-goal";

export const groupRoutes: RouteObject = {
  path: "groups",
  children: [
    {
      path: ":groupId",
      id: "group-show",
      lazy: {
        loader: async () =>
          (await import("@/features/groups/loaders")).getGroupLoader,
        Component: async () => (await import("@/pages/groups/show")).default,
      },
      children: [savingsGoalRoutes],
    },
  ],
};
