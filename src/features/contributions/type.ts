import type { WithTimestamp } from "@/types/common";

export type Contribution = WithTimestamp & {
  id: number;
  savings_goal_id: number;
  user_id: number;
  amount: number;
  note?: string;
  deleted_at: null | string;
};
