import type { RouteObject } from "react-router";

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
      },
      children: [
        {
          index: true,
          lazy: {
            Component: async () =>
              (await import("@/pages/groups/savings-goals/show")).default,
          },
        },
      ],
    },
  ],
};
