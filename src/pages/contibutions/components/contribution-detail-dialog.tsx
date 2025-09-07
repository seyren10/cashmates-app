import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Contribution } from "@/features/contributions/type";
import { formatToPhp } from "@/lib/helpers";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Text } from "lucide-react";
import { type PropsWithChildren } from "react";
import ContributionComments from "./contribution-comments";

type Props = { contribution: Contribution } & PropsWithChildren;

function ContributionDetailDialog({ contribution, children }: Props) {
  const { amount, user, note } = contribution;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Contribution:
            <span className="text-primary"> {formatToPhp(amount)}</span>
          </DialogTitle>
          <DialogDescription>by {user.name}</DialogDescription>
        </DialogHeader>

        <div className="space-x-2">
          <Text className="size-4 float-start text-muted-foreground mt-1" />
          <span>{note || "-"}</span>
        </div>
        <Separator />
        <ContributionComments>
            {}
        </ContributionComments>
      </DialogContent>
    </Dialog>
  );
}

export default ContributionDetailDialog;
