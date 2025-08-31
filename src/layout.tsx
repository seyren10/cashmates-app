import { CheckCircle, OctagonX, Users2 } from "lucide-react";
import { AppSidebar } from "./components/app/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "./components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import { ModeToggle } from "./components/mode-toggle";
import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";
import AppLayoutHeader from "./components/app/app-layout-header";

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <CustomSidebarToggler />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <AppLayoutHeader />
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
          <ScrollRestoration />
        </main>
      </SidebarInset>
      <Toaster
        icons={{
          error: <OctagonX className="stroke-destructive size-4" />,
          success: <CheckCircle className="stroke-success size-4" />,
        }}
        toastOptions={{
          className: "!bg-background",
          classNames: {
            default: "!text-foreground",
            error: "!text-destructive !border-destructive/25 ",
            success: "!text-success !border-success/25",
          },
        }}
      />
    </SidebarProvider>
  );
};

function CustomSidebarToggler({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <Users2 />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
