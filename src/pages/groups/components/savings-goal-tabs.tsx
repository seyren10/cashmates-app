import AppButtonLoaderSwap from "@/components/app/app-button-loader-swap";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink, useMatch } from "react-router";

function GroupSavingsGoalTabs() {
  const contributionMatch = useMatch(
    "/groups/:groupId/savings-goals/:savingsGoalId/contributions/*"
  );
  const expenseMatch = useMatch(
    "/groups/:groupId/savings-goals/:savingsGoalId/expenses/*"
  );

  const activeTab = contributionMatch
    ? "contributions"
    : expenseMatch
    ? "expenses"
    : "";
  return (
    <Tabs value={activeTab}>
      <TabsList className="w-full">
        <TabsTrigger value="contributions" asChild>
          <NavLink to={"contributions"} end>
            {({ isPending }) => (
              <>
                <AppButtonLoaderSwap loading={isPending}></AppButtonLoaderSwap>
                <span>Contributions</span>
              </>
            )}
          </NavLink>
        </TabsTrigger>
        <TabsTrigger value="expenses">
          <NavLink to={"expenses"} end>
            {({ isPending }) => (
              <>
                <AppButtonLoaderSwap loading={isPending}></AppButtonLoaderSwap>
                <span>Expenses</span>
              </>
            )}
          </NavLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default GroupSavingsGoalTabs;
