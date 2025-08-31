import type { WithTimestamp } from "@/types/common";
import type { Group } from "../groups/type";

export type SavingsGoal = WithTimestamp & {
  id: number;
  group_id: number;
  name: string;
  target_amount: number;
  deadline: null | string;
  deleted_at: string;
  current_balance: number;
};

export type SavingsGoalShow = SavingsGoal & {
  group: Group;
  contributions_count: number;
  expenses_count: number;
};
