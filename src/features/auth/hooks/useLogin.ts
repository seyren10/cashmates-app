import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { toast } from "sonner";
import type { LaravelError } from "../type";
import { useNavigate } from "react-router";

export const useLogin = (options?: { redirect?: boolean }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.log((error as LaravelError).response?.data.message);
      toast.error(`Login failed`, {
        description: (error as LaravelError).response?.data.message,
        position: "top-center",
      });
    },
    onSuccess: () => {
      if (options?.redirect) {
        navigate("/", { replace: true });
      }
    },
  });

  return [mutate, isPending] as const;
};
