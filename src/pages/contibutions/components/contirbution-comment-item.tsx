import type { Comment } from "@/features/comments/type";
import { format } from "date-fns";

type Props = {
  comment: Comment;
};

function ContributionCommentItem({ comment }: Props) {
  const { user, body, created_at } = comment;
  return (
    <li className="rounded-md border p-2 space-y-2">
      <p className="font-medium">{user.name}</p>
      <p>{body}</p>
      <p className="text-muted-foreground text-xs">
        {format(created_at, "MM dd y hh:mm a")}
      </p>
    </li>
  );
}

export default ContributionCommentItem;
