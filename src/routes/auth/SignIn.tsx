import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { HandIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signIn } from "@/lib/auth";
import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { useNotes } from "@/lib/state/notes";
import { useUser } from "@/lib/state/auth";
import { error } from "@/lib/toast";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8).max(72),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const {
    cloud: { initNotes },
  } = useNotes();

  const { initUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    await signIn(email, password)
      .then(() => {
        initNotes("");
        initUser().then(() => navigate(params.get("redirect_url") ?? "/"));
      })
      .catch(
        ({
          response: {
            data: { error: responseError },
          },
        }) => {
          error(responseError);
        }
      );
  };

  return (
    <>
      <div>
        <HandIcon className="h-10 w-10 mb-6" />
        <h2 className="text-2xl font-semibold mb-10">Welcome back!</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-80 space-y-8">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    No spam. Used only for auth.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be 8 - 72 characters long. Super secret.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator className="h-4 w-4 mr-2" />
              ) : null}
              Sign in
            </Button>
          </form>
        </Form>
      </div>
      <Link
        to="/auth/sign-up"
        className={buttonVariants({
          variant: "link",
          className: "absolute bottom-10",
        })}
      >
        Don&apos;t have an account? Sign up.
      </Link>
    </>
  );
}
