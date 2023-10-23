import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/lib/state/auth";
import { Button, buttonVariants } from "@/components/ui/Button";
import AvatarChange from "@/components/AvatarChange";
import { useNotes } from "@/lib/state/notes";

export default function Account() {
  const { user, signOut, isLoading } = useUser();
  const {
    cloud: { hideCloudNotes },
  } = useNotes();
  const navigate = useNavigate();
  if (!user && !isLoading)
    return (
      <div className="flex items-center justify-center flex-col w-screen h-screen">
        <h1 className="text-xl font-bold mb-4">You are not signed in</h1>
        <Link
          to="/auth/sign-in?redirect_url=%2Faccount"
          className={buttonVariants({ variant: "link" })}
        >
          Sign in
        </Link>
      </div>
    );

  return (
    <div className="h-screen w-screen">
      <div className="border border-border m-5 p-5 rounded-lg flex items-start">
        <AvatarChange avatar_id={user?.avatar_id ?? null} />
        <div>
          <h1 className="text-xl font-bold">Welcome!</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <span className="flex-1" />
        <Button
          onClick={() =>
            signOut().then(() => {
              hideCloudNotes();
              navigate("/");
            })
          }
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
