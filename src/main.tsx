import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as ReactReduxProvider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";
import store from "./store";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReactReduxProvider>
  </StrictMode>
);
