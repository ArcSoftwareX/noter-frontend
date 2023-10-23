import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">An error occured</h1>
      <p>{error.message}</p>
    </div>
  );
}
