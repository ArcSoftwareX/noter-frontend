import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-muted-foreground text-sm">
        The requested page does not exist.{" "}
        <Link
          to="/"
          className="font-semibold hover:underline hover:text-primary underline-offset-4"
        >
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
