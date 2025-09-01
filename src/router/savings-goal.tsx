import type { RouteObject } from "react-router";
import { contributionRoutes } from "./contributions";

export const savingsGoalRoutes: RouteObject = {
  path: "savings-goals",
  children: [
    {
      path: ":savingsGoalId",
      id: "savings-goal-show",
      lazy: {
        loader: async () =>
          (await import("@/features/savings-goals/loaders"))
            .getSavingsGoalLoader,
        Component: async () =>
          (await import("@/pages/groups/savings-goals/show")).default,
      },
      children: [contributionRoutes],
    },
  ],
};
