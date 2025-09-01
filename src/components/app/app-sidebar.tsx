import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, NavLink, useNavigate } from "react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Copy,
  Edit,
  Group as GroupIcon,
  LoaderCircle,
  LogOut,
  MoreHorizontal,
  PhilippinePeso,
  Plus,
  StarOff,
  Trash2,
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
import { toast } from "sonner";
import { useDeleteGroup } from "@/features/groups/hooks/useDeleteGroup";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PropsWithChildren,
} from "react";
import { Input } from "../ui/input";
import { useUpdateGroup } from "@/features/groups/hooks/useUpdateGroup";

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
          <SidebarGroup>
            <SidebarMenuItem>
              <GroupCreateDialog>
                <SidebarMenuButton size={"lg"} className="border-dashed border">
                  <Plus />
                  Create new group
                </SidebarMenuButton>
              </GroupCreateDialog>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Groups</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <GroupSidebarGroup groups={groups}>
                {groups.map((group) => (
                  <GroupSidebarItem key={group.id} group={group} />
                ))}
              </GroupSidebarGroup>
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
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                logout();
              }}
            >
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

function GroupSidebarGroup({
  groups,
  children,
}: {
  groups: Group[];
} & PropsWithChildren) {
  if (!groups.length)
    return (
      <SidebarGroup className="space-y-2">
        <p className="text-xs text-muted-foreground">
          You don't have any groups yet. Create a new group by clicking the
          button above to get started.
        </p>
      </SidebarGroup>
    );

  return children;
}

function GroupSidebarItem({ group }: { group: Group }) {
  const [editing, setEditing] = useState(false);
  const [groupNameEdit, setGroupNameEdit] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { isMobile } = useSidebar();
  const [mutateDeleteGroup] = useDeleteGroup();
  const [mutateUpdateGroup, isUpdating] = useUpdateGroup();

  const handleCopyToClipboard = async (group: Group) => {
    try {
      await navigator.clipboard.writeText(group.join_code);
      toast.success("Invitation code copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy invitation code. Please try again.", {
        description: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    if (!editing) return;

    const id = requestAnimationFrame(() => {
      const el = inputRef.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      el.select();
    });
    return () => cancelAnimationFrame(id);
  }, [editing]);

  const handleStartEditing = () => {
    setEditing(true);
    setGroupNameEdit(group.name);
  };

  const handleStopEditing = () => {
    setEditing(false);
    setGroupNameEdit("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutateUpdateGroup(
        {
          groupId: group.id,
          payload: { name: groupNameEdit },
        },
        {
          onSuccess: () => handleStopEditing(),
        }
      );
    } else if (e.key === "Escape") handleStopEditing();
  };

  return (
    <SidebarMenuItem>
      {!editing ? (
        <NavLink to={`groups/${group.id}`}>
          {({ isActive, isPending }) => (
            <SidebarMenuButton isActive={isActive} tooltip={group.name}>
              {isPending && <LoaderCircle className="size-4 animate-spin" />}
              <GroupIcon />
              <span>{group.name}</span>
            </SidebarMenuButton>
          )}
        </NavLink>
      ) : (
        <Input
          value={groupNameEdit}
          ref={inputRef}
          onBlur={() => handleStopEditing()}
          onKeyDown={handleKeyPress}
          onChange={(e) => setGroupNameEdit(e.target.value)}
          disabled={isUpdating}
          className="text-sm"
        />
      )}
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!editing && (
              <SidebarMenuAction showOnHover>
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </SidebarMenuAction>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem>
              <StarOff className="text-muted-foreground" />
              <span>Remove from Favorites</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => handleStartEditing()}>
              <Edit className="text-muted-foreground" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleCopyToClipboard(group)}>
              <Copy className="text-muted-foreground" />
              <span>Copy invitation code</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`groups/${group.id}`} target="_blank" rel="noreferrer">
                <ArrowUpRight className="text-muted-foreground" />
                <span>Open in New Tab</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-destructive focus-visible:text-destructive">
                <Trash2 className="text-destructive" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>You're about to delete this group</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => mutateDeleteGroup(group.id)}
              >
                <Trash2 />
                Yes, delete it
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
}
