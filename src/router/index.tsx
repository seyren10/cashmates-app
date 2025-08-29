import { Layout } from "@/layout";
import Login from "@/pages/auth/login";
import { createBrowserRouter } from "react-router";
import { mainLoader } from "./loaders/main";

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: mainLoader,
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
