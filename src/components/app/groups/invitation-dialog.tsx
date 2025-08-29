import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Group } from "@/features/groups/type";
import { Check, Copy } from "lucide-react";
import { useState, type PropsWithChildren } from "react";
import { toast } from "sonner";

type Props = PropsWithChildren & {
  group: Group;
  onClose?: (open: boolean) => void;
};

function GroupInvitationDialog({ group, children, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(group.join_code);
      setCopied(true);
      toast.success("Invitation code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy the invitation code. Please try again.", {
        description: (err as Error).message,
      });
    }
  };
  return (
    <Dialog onOpenChange={(e) => !e && onClose?.(e)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this group</DialogTitle>
          <DialogDescription>
            Copy the invitation code and share it with your friends
          </DialogDescription>
          <div className="space-y-2">
            <Label htmlFor="link" className="sr-only">
              Invitation Code
            </Label>
            <div className="flex items-center gap-2">
              <Input id="link" readOnly defaultValue={group.join_code} />
              <Button onClick={handleCopy} size={"icon"}>
                {copied ? <Check /> : <Copy />}
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GroupInvitationDialog;
