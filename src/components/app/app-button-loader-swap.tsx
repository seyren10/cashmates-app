import { LoaderCircle } from "lucide-react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  loading?: boolean;
};

export default function AppButtonLoaderSwap({ loading, children }: Props) {
  return !loading ? children : <LoaderCircle className="size-4 animate-spin" />;
}
