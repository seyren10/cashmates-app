import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Contribution } from "@/features/contributions/type";

type Props = {
  contribution: Contribution;
};

function ContributionTabsContent({ contribution }: Props) {
  const { amount, note } = contribution;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributions</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default ContributionTabsContent;
