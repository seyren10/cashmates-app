import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function GroupSavingsGoalTabs() {
  return (
    <Tabs>
      <TabsList className="w-full">
        <TabsTrigger value="contributions">Contributions</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
      </TabsList>

      <TabsContent value="contributions"></TabsContent>
    </Tabs>
  );
}

export default GroupSavingsGoalTabs;
