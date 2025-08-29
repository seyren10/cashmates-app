import type { WithTimestamp } from "@/types/common";
import type { UserRole } from "../auth/type";
import type { SavingsGoal } from "../savings-goals/type";
import type z from "zod";
import type { groupSchema } from "./schema";

export type Group = WithTimestamp & {
  id: 1;
  name: string;
  join_code: string;
  deleted_at: string;
  pivot: {
    user_id: number;
    group_id: number;
    role: UserRole;
  };
  savings_goals: SavingsGoal[];
};

export type GroupSchema = z.infer<typeof groupSchema>;
export type CreateGroupPayload = GroupSchema;
export type UpdateGroupPayload = Partial<GroupSchema>;
