import type { RouteObject } from "react-router";

export const contributionRoutes: RouteObject = {
  path: "contributions",
  id: "contributions",
  lazy: {
    loader: async () =>
      (await import("@/features/contributions/loaders")).getContributionsLoader,
    Component: async () => (await import("@/pages/contibutions")).default,
  },
};
