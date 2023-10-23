import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface LogoProps extends HTMLAttributes<HTMLImageElement> {}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <img
      {...props}
      className={cn("select-none pointer-events-none", className)}
      src="/noter.svg"
    />
  );
}
