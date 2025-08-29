import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type PropsWithChildren } from "react";
import GroupForm from "./form";

type Props = PropsWithChildren;

function GroupCreateDialog({ children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new group
          </DialogDescription>
        </DialogHeader>
        <GroupForm defaultValues={{ name: "" }} onSubmit={() => {}} />
      </DialogContent>
    </Dialog>
  );
}

export default GroupCreateDialog;
