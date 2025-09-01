import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateDeleteGroup, isPending } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
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
    onSettled: (_, error) => {
      if (!error) {
        toast.info("Group successfully deleted");
      }
    },
  });

  return [mutateDeleteGroup, isPending] as const;
};
