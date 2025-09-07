import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import React, { type ComponentProps, type PropsWithChildren } from "react";

type Props = ComponentProps<"div"> & PropsWithChildren;

function ContributionComments({ className, children }: Props) {
  return (
    <div className={cn(className, 'space-y-4')}>
      <span className="flex items-center gap-2">
        <MessageCircle className="text-muted-foreground size-4" />
        <span className="text-sm"> Comments</span>
      </span>

      {children}
    </div>
  );
}

export default ContributionComments;
