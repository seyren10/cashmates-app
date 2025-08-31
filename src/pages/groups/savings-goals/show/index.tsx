import { useSavingsGoal } from "@/features/savings-goals/hooks/useSavingsGoal";
import GroupSavingsGoalCard from "../../components/savings-goal-card";
import GroupSavingsGoalProgressCard from "../../components/savings-goal-progress-card";
import GroupSavingsGoalTabs from "../../components/savings-goal-tabs";


function SavingsGoalShow() {
  const savingsGoal = useSavingsGoal();
  return (
    <section className="space-y-4">
      <GroupSavingsGoalCard savingsGoal={savingsGoal} />
      <GroupSavingsGoalProgressCard savingsGoal={savingsGoal} />
      <GroupSavingsGoalTabs />
    </section>
  );
}

export default SavingsGoalShow;
