import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "../api";
import { getGroupsQueryOptions } from "../query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { UpdateGroupPayload } from "../type";

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteGroup, isPending } = useMutation({
    mutationFn: ({
      groupId,
      payload,
    }: {
      groupId: number;
      payload: UpdateGroupPayload;
    }) => updateGroup(groupId, payload),
    onSuccess: () => {
      return queryClient.invalidateQueries(getGroupsQueryOptions());
    },
    onError: (error, groupId) => {
      toast.error("Something went wrong", {
        description: (error as AxiosError).response?.statusText,
        action: {
          label: "Retry",
          onClick: () => mutateDeleteGroup(groupId),
        },
      });
    },
  });

  return [mutateDeleteGroup, isPending] as const;
};
