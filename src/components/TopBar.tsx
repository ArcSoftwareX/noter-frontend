import { Avatar, AvatarFallback } from "./ui/Avatar";
import { SmallHeading, Tertiary } from "./ui/Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/Tooltip";
import { Command } from "lucide-react";
import { useCommandPalette } from "@/lib/state/commandPalette";
import Logo from "./Logo";

export default function TopBar({
  title,
  desc,
}: {
  title: string;
  desc: string | null;
}) {
  const { open } = useCommandPalette();

  return (
    <div className="fixed top-0 inset-x-0 h-16 py-2 bg-secondary/60 border-b border-b-border backdrop-blur-xl flex items-center justify-stretch px-4 z-50">
      <Tooltip>
        <TooltipTrigger className="mr-4">
          <Avatar onClick={open}>
            <AvatarFallback>
              <Logo className="h-full w-full" />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="flex items-center">
          Command palette
          <span className="flex items-center ml-2 text-muted-foreground">
            <Command className="h-4" /> P
          </span>
        </TooltipContent>
      </Tooltip>
      <div>
        <SmallHeading>{title?.length ? title : "Untitled"}</SmallHeading>
        {desc ? (
          <Tooltip>
            <TooltipTrigger>
              <Tertiary className="whitespace-nowrap max-w-[calc(100vw-100px)] sm:max-w-[calc(100vw-200px)] overflow-hidden text-ellipsis">
                {desc}
              </Tertiary>
            </TooltipTrigger>
            <TooltipContent className="flex items-center">
              {desc}
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
}
