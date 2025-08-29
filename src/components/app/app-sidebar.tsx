import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Group as GroupIcon,
  LoaderCircle,
  LogOut,
  PhilippinePeso,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/features/auth/hooks/useUser";
import type { User } from "@/features/auth/type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { logoutUser } from "@/features/auth/api";
import AppButtonLoaderSwap from "./app-button-loader-swap";
import { getUserQueryOptions } from "@/features/auth/query";
import type { Group } from "@/features/groups/type";
import { getGroupsQueryOptions } from "@/features/groups/query";
import GroupCreateDialog from "./groups/create-dialog";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();
  const { data: groups } = useSuspenseQuery(getGroupsQueryOptions());
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size={"lg"}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <PhilippinePeso className="size-4" />
              </div>
              <p className="font-medium">Cashmates</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Groups</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <GroupCreateDialog>
                  <SidebarMenuButton
                    size={"lg"}
                    className="border-dashed border"
                  >
                    <Plus />
                    Create new group
                  </SidebarMenuButton>
                </GroupCreateDialog>
              </SidebarMenuItem>
              <GroupItem groups={groups} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries(getUserQueryOptions());
      navigate("/login", { replace: true });
    },
  });
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar as string} alt={user.name} />
                <AvatarFallback className="rounded-lg">CM</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar as string} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => logout()}>
              <AppButtonLoaderSwap loading={isLoggingOut}>
                <LogOut />
              </AppButtonLoaderSwap>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function GroupItem({ groups }: { groups: Group[] }) {
  if (!groups.length)
    return (
      <SidebarGroup className="space-y-2">
        <p className="text-xs text-muted-foreground">
          You don't have any groups yet. Create a new group by clicking the
          button above to get started.
        </p>
      </SidebarGroup>
    );

  return groups.map((group) => (
    <SidebarMenuItem key={group.name}>
      <NavLink to={`groups/${group.id}`} end>
        {({ isActive, isPending }) => (
          <SidebarMenuButton isActive={isActive} tooltip={group.name}>
            {isPending && <LoaderCircle className="size-4 animate-spin" />}
            <GroupIcon />
            {group.name}
          </SidebarMenuButton>
        )}
      </NavLink>
    </SidebarMenuItem>
  ));
}
