import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "../components/ui/Tooltip";
import CommandPalette from "../components/CommandPalette";
import { useInitializers } from "../lib/init";
import { useCommandPalette } from "@/lib/state/commandPalette";

function Layout() {
  useInitializers();
  const { open } = useCommandPalette();
  const location = useLocation();

  return (
    <div className="flex items-stretch h-full w-full">
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <TooltipProvider>
        <CommandPalette />
        <Outlet />
      </TooltipProvider>
      {location.pathname.includes("/auth") ? null : (
        <div className="fixed bottom-5 inset-x-0 text-center">
          <button
            className="px-3 py-2 rounded-lg backdrop-blur-xl text-sm text-muted-foreground"
            onClick={open}
          >
            Open command palette
          </button>
        </div>
      )}
    </div>
  );
}

export default Layout;
