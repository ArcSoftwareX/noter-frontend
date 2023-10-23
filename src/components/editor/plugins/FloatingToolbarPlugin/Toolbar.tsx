/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

export type Action = { key: string; icon: ReactNode; action: () => void };

export interface ActiveStyles {
  isBold: boolean | null;
  isCode: boolean | null;
  isItalic: boolean | null;
  isStrikethrough: boolean | null;
  isUnderline: boolean | null;
  isHighlight: boolean | null;
  isSubscript: boolean | null;
  isSuperscript: boolean | null;
}

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  actions: Action[];
  active: ActiveStyles;
}

const constructKey = (key: string) => `is${key}`;

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  function Toolbar({ className, active, actions, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute p-[1px] rounded-md bg-background/50 backdrop-blur-lg border border-border text-sm font-light z-50",
          className
        )}
        {...props}
      >
        {actions.map(({ action, icon, key: _key }) => {
          const key = constructKey(_key);
          /* @ts-ignore */
          const isActive = active[key];

          return (
            <Tooltip key={_key}>
              <TooltipTrigger asChild onClick={action}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    (isActive as boolean | null) === true
                      ? "bg-primary text-background"
                      : isActive === false
                      ? "bg-transparent"
                      : "pointer-events-none bg-transparent text-muted-foreground"
                  }`}
                >
                  {icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{key}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    );
  }
);
