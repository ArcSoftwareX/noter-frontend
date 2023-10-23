import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "w-full bg-secondary/50 animate-pulse rounded-lg",
        className
      )}
      {...props}
    />
  );
};
