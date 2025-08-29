import type { WithTimestamp } from "@/types/common";

export type SavingsGoal = WithTimestamp & {
  id: number;
  group_id: number;
  name: string;
  target_amount: number;
  deadline: null | string;
  deleted_at: string;
  current_balance: number;
};
