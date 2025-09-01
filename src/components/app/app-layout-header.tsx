import { useUser } from "@/features/auth/hooks/useUser";
import { User, Users2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useMatches } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getGroupQueryOptions } from "@/features/groups/query";

function AppLayoutHeader() {
  const routes = useMatches();

  const groupId = routes.find((route) => route.id === "group-show")
    ?.loaderData as number;
  if (!groupId)
    return (
      <div>
        <p>No group selected</p>
      </div>
    );

  return <AppLayoutHeaderGroup groupId={groupId} />;
}

function AppLayoutHeaderGroup({ groupId }: { groupId: number }) {
  const authUser = useUser();
  const { data: group } = useSuspenseQuery(getGroupQueryOptions(groupId));

  const userRoleOnGroup = group.users.find((user) => user.id === authUser.id)
    ?.pivot.role;
  const usersCount = group.users.length;

  return (
    <div className="grow inline-flex items-center gap-2">
      <p className="capitalize md:text-sm line-clamp-2">{group.name}</p>
      <Badge className="capitalize ml-auto">
        <User /> {userRoleOnGroup || "-"}
      </Badge>
      <Badge variant={"outline"} className="space-x-1">
        <Users2 /> <span className="font-medium">{usersCount}</span>
      </Badge>
    </div>
  );
}

export default AppLayoutHeader;
