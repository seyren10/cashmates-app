import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { getUserQueryOptions } from "@/features/auth/query";
import { loginCredentialSchema } from "@/features/auth/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, OctagonX, PhilippinePeso } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";

function Login() {
  const { data: user } = useQuery(getUserQueryOptions());

  if (user) return <Navigate to="/" />;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <PhilippinePeso className="size-4" />
          </div>
          <div>
            <p>Cashmates</p>
            <p className="text-muted-foreground text-xs">
              Save it, spend it — together.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

function LoginGoogle() {
  const googleRedirectUrl =
    import.meta.env.VITE_BACKEND_URL + "/auth/google/redirect";
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <Button variant="outline" className="w-full" asChild type="button">
          <a href={googleRedirectUrl}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </a>
        </Button>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
    </div>
  );
}

function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const formSchema = useForm({
    resolver: zodResolver(loginCredentialSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, isLoggingIn] = useLogin({ redirect: true });
  const handleSubmit = formSchema.handleSubmit((data) => {
    login(data);
  });

  return (
    <Form {...formSchema}>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginGoogle />
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <FormField
                control={formSchema.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={formSchema.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Toaster
        icons={{
          error: <OctagonX className="stroke-destructive size-4" />,
          success: <CheckCircle className="stroke-success size-4" />,
        }}
        toastOptions={{
          className: "!bg-background",
          classNames: {
            default: "!text-foreground",
            error: "!text-destructive !border-destructive/25 ",
            success: "!text-success !border-success/25",
          },
        }}
      />
    </Form>
  );
}

export default Login;
