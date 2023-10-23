// export const h4 = 'scroll-m-20 text-base font-semibold tracking-tight'
// export const tertiary = 'text-sm text-muted-foreground'

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {}

export const SmallHeading = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

export const Tertiary = ({
  className,
  children,
  ...props
}: TypographyProps) => {
  return (
    <h4 className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </h4>
  );
};
