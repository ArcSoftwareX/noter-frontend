import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from "react-router-dom";

export interface NavLinkProps extends RouterNavLinkProps {}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ children, className, ...props }, ref) {
    return (
      <RouterNavLink
        className={({ isActive, isPending }) =>
          cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
            `${
              isActive
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            } ${
              isPending
                ? "pointer-events-none cursor-not-allowed opacity-70"
                : "pointer-events-auto cursor-pointer opacity-100"
            } rounded-lg h-9 px-4 py-2`,
            className
          )
        }
        ref={ref}
        {...props}
      >
        {children}
      </RouterNavLink>
    );
  }
);
