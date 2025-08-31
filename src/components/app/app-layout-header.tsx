import { useUser } from "@/features/auth/hooks/useUser";
import { useAppSelector } from "@/hooks/use-redux";
import { User, Users2 } from "lucide-react";
import { Badge } from "../ui/badge";

function AppLayoutHeader() {
  const group = useAppSelector((state) => state.group.group);
  const authUser = useUser();

  if (!group)
    return (
      <div>
        <p>No group selected</p>
      </div>
    );

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
