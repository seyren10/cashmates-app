import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GroupForm from "./form";
import { useState, type PropsWithChildren } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "@/features/groups/api";
import type { Group, UpdateGroupPayload } from "@/features/groups/type";
import { getGroupsQueryOptions } from "@/features/groups/query";
import { toast } from "sonner";

type Props = PropsWithChildren & {
  group: Group;
};

function GroupEditDialog({ children, group }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();
  const groups = queryClient.getQueryData(getGroupsQueryOptions().queryKey);
  const selectedGroup = groups?.find((g) => group.id === g.id);
  const { mutate: mutateUpdateGroup } = useMutation({
    mutationFn: ({
      groupId,
      payload,
    }: {
      groupId: number;
      payload: UpdateGroupPayload;
    }) => updateGroup(groupId, payload),
    onMutate: () => {
      setOpenDialog(false);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(getGroupsQueryOptions());
      toast.success("Group updated successfully");
    },
  });

  if (!group) return null;
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new group
          </DialogDescription>
        </DialogHeader>
        <GroupForm
          defaultValues={{ name: selectedGroup?.name || "" }}
          onSubmit={(payload) =>
            mutateUpdateGroup({ groupId: group.id, payload })
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default GroupEditDialog;
