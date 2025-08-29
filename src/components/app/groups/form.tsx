import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "@/features/groups/schema";
import type { GroupSchema } from "@/features/groups/type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppButtonLoaderSwap from "@/components/app/app-button-loader-swap";
import { ChevronRight } from "lucide-react";

type Props = {
  defaultValues: GroupSchema;
  loading?: boolean;
  onSubmit: (data: GroupSchema) => void;
};

function GroupForm({ defaultValues, onSubmit, loading }: Props) {
  const formSchema = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues,
  });
  const { control } = formSchema;
  return (
    <Form {...formSchema}>
      <form onSubmit={formSchema.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoFocus/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full">
          <AppButtonLoaderSwap loading={loading}>
            <ChevronRight />
          </AppButtonLoaderSwap>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default GroupForm;
