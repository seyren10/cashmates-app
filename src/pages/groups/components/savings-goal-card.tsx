import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SavingsGoalShow } from "@/features/savings-goals/type";
import { Calendar, HandCoins, Wallet } from "lucide-react";
import { format } from "date-fns";

type Props = {
  savingsGoal: SavingsGoalShow;
};

function GroupSavingsGoalCard({ savingsGoal }: Props) {
  const { name, deadline, contributions_count, expenses_count } = savingsGoal;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{name}</CardTitle>
        <CardDescription className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <span className="inline-flex gap-2 items-center basis-full">
            <Calendar className="size-4" />
            <span>
              {deadline !== null ? format(deadline, "MMM dd y") : "Open"}
            </span>
          </span>
          <span className="inline-flex gap-2 items-center">
            <HandCoins className="size-4" />
            <span>
              Contrbutions <strong>{contributions_count}</strong>
            </span>
          </span>
          <span className="inline-flex gap-2 items-center">
            <Wallet className="size-4" />
            <span>
              Expenses <strong>{expenses_count}</strong>
            </span>
          </span>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default GroupSavingsGoalCard;
