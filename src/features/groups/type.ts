import type { WithTimestamp } from "@/types/common";
import type { User, UserRole } from "../auth/type";
import type { SavingsGoal } from "../savings-goals/type";
import type z from "zod";
import type { groupSchema } from "./schema";

export type Group = WithTimestamp & {
  id: 1;
  name: string;
  join_code: string;
  deleted_at: string;
  pivot: GroupPivot;
};

export type GroupShow = Group & {
  users: (User & { pivot: GroupPivot })[];
  savings_goals: SavingsGoal[];
};

export type GroupPivot = {
  user_id: number;
  group_id: number;
  role: UserRole;
};

export type GroupSchema = z.infer<typeof groupSchema>;
export type CreateGroupPayload = GroupSchema;
export type UpdateGroupPayload = Partial<GroupSchema>;

export type GroupState = {
  group: GroupShow | null;
};
