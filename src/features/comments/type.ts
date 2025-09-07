import type { WithTimestamp } from "@/types/common";
import type { User } from "../auth/type";

export type Comment = WithTimestamp & {
  body: string;
  user_id: number;
  commentable_id: number;
  commentable_type: number;
  id: number;
  user: User;
};
