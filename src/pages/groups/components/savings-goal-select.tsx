import AppButtonLoaderSwap from "@/components/app/app-button-loader-swap";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSavingsGoal } from "@/features/savings-goals/hooks/useSavingsGoal";
import type { getSavingsGoalLoader } from "@/features/savings-goals/loaders";
import type { SavingsGoal } from "@/features/savings-goals/type";
import { Goal } from "lucide-react";
import { useNavigate, useNavigation, useRouteLoaderData } from "react-router";

type Props = {
  savingsGoals: SavingsGoal[];
};

function GroupSavingsGoalSelect({ savingsGoals }: Props) {
  const savingsGoalId =
    useRouteLoaderData<Awaited<ReturnType<typeof getSavingsGoalLoader>>>(
      "savings-goal-show"
    ) || "";

  const isNavigating = useNavigation().state === "loading";
  const navigate = useNavigate();

  return (
    <div>
      <Label htmlFor="savings-goals" className="sr-only">
        Select Savings goal
      </Label>
      <Select defaultValue={String(savingsGoalId)}>
        <SelectTrigger className="w-full md:w-auto" disabled={isNavigating}>
          <AppButtonLoaderSwap loading={isNavigating}>
            <Goal />
          </AppButtonLoaderSwap>
          <SelectValue placeholder="Select savings goal" />
        </SelectTrigger>
        <SelectContent>
          {savingsGoals.map((savingsGoal) => (
            <SelectItem
              value={String(savingsGoal.id)}
              key={savingsGoal.id}
              onClick={() => navigate(`savings-goals/${savingsGoal.id}`)}
            >
              {savingsGoal.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default GroupSavingsGoalSelect;
