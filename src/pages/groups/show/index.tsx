import { useGroup } from "@/features/groups/hooks/useGroup";
import GroupSavingsGoalSelect from "../components/savings-goal-select";
import { Outlet, useMatch } from "react-router";

function GroupShowPageIndex() {
  const group = useGroup();
  const { savings_goals } = group;
  const savingsGoalMatches = useMatch(
    "/groups/:groupId/savings-goals/:savingsGoalId"
  );
  return (
    <div className="space-y-4">
      <GroupSavingsGoalSelect savingsGoals={savings_goals} />
      {savingsGoalMatches ? (
        <Outlet />
      ) : (
        <div>Select a savings goal to view details</div>
      )}
    </div>
  );
}

export default GroupShowPageIndex;
