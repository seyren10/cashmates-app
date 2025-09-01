import type { WithTimestamp } from "@/types/common";
import type { User } from "../auth/type";

export type Contribution = WithTimestamp & {
  id: number;
  savings_goal_id: number;
  user_id: number;
  amount: number;
  note?: string;
  deleted_at: null | string;
  comments_count: number;
  user: User;
};
