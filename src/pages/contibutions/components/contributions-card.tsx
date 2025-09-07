import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Contribution } from "@/features/contributions/type";
import { formatToPhp } from "@/lib/helpers";
import { formatDistance } from "date-fns";
import { MessageCircle, Text } from "lucide-react";
import ContributionDetailDialog from "./contribution-detail-dialog";

type Props = {
  contributions: Contribution[];
};

function ContributionsCard({ contributions }: Props) {
  return contributions.map((contribution) => (
    <ContributionCardItem contribution={contribution} key={contribution.id} />
  ));
}

function ContributionCardItem({
  contribution,
}: {
  contribution: Contribution;
}) {
  const { user, amount, comments_count, created_at, note } = contribution;
  const userName = user.name;
  const userAvatar = user.avatar;
  const userInitials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <ContributionDetailDialog contribution={contribution}>
      <Card className="text-xs p-4">
        <CardHeader className="flex gap-2 p-0">
          <div>
            <Avatar>
              <AvatarImage src={userAvatar as string} alt={userName} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-sm">
              <span className="font-bold">{userName}</span>
              <span> contributed </span>
              <span className="text-primary">{formatToPhp(amount)}</span>
            </CardTitle>
            <CardDescription className="text-xs">
              {formatDistance(new Date(created_at), new Date(), {
                addSuffix: true,
              })}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 p-0">
          <div className="text-muted-foreground text-sm flex items-center gap-2">
            <Text className="size-4" /> {note || "-"}
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <MessageCircle className="size-4 text-muted-foreground" />
            {comments_count} comments
          </div>
        </CardContent>
      </Card>
    </ContributionDetailDialog>
  );
}

export default ContributionsCard;
