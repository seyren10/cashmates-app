import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SavingsGoalShow } from "@/features/savings-goals/type";
import { formatToPhp } from "@/lib/helpers";

type Props = {
  savingsGoal: SavingsGoalShow;
};

function GroupSavingsGoalProgressCard({ savingsGoal }: Props) {
  const { current_balance, target_amount } = savingsGoal;

  const progress = Math.min(
    100,
    Math.round((current_balance / target_amount) * 100)
  );

  const remaining = target_amount - current_balance;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-4 text-primary font-bold">
          {formatToPhp(current_balance)}
        </CardTitle>
        <CardDescription>of {formatToPhp(target_amount)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={progress} />
        <div className="flex items-start gap-4 justify-between text-sm">
          <div>
            <p className="text-muted-foreground">{progress}%</p>
            <span className="text-muted-foreground">Funded</span>
          </div>
          <div className="text-end">
            <p className="font-medium"> {formatToPhp(remaining)}</p>
            <span className="text-muted-foreground">Remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GroupSavingsGoalProgressCard;
