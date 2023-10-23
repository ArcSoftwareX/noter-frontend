import Logo from "@/components/Logo";
import { FingerprintIcon } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const { pathname } = useLocation();
  const actionstr = pathname.split("/").at(-1)!;
  const pathsplit = actionstr.split("-");
  const action =
    pathsplit[0].at(0)?.toUpperCase() +
    pathsplit[0].slice(1) +
    " " +
    pathsplit[1];

  return (
    <div className="h-screen w-screen flex items-stretch justify-stretch">
      <div className="bg-secondary/40 border-r border-r-border p-10 w-1/2 lg:flex items-start justify-end flex-col hidden">
        <Logo className="absolute top-10 left-10 h-10 w-10" />
        <FingerprintIcon strokeWidth={1.5} className="h-16 w-16 mb-4" />
        <div className="font-semibold text-xl">{action} to Noter.</div>
      </div>
      <div className="h-full w-full lg:w-1/2 flex items-center justify-center flex-col">
        <Outlet />
      </div>
    </div>
  );
}
