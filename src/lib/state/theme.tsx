import { ThemeIcon } from "@/components/ui/ThemeIcon";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "system";

type State = { theme: Theme };
type Actions = {
  switchTheme: () => void;
  applyTheme: () => void;
  showThemeToast: () => void;
};

export const useTheme = create<State & Actions>()(
  persist<State & Actions>(
    (set, get) => ({
      theme: "system",
      switchTheme: () => {
        const { theme: current, applyTheme, showThemeToast } = get();
        const theme =
          current === "dark"
            ? "system"
            : current === "light"
            ? "dark"
            : "light";

        localStorage.setItem("theme", theme);
        set({ theme });
        applyTheme();
        showThemeToast();
      },
      applyTheme: () => {
        const { theme } = get();

        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

          root.classList.add(systemTheme);
          return;
        }

        root.classList.add(theme);
      },
      showThemeToast: () => {
        const { theme } = get();

        toast(
          <div className="flex items-center gap-4">
            <ThemeIcon iconSize={18} theme={theme} />
            <p>
              Theme switched to{" "}
              <span className="font-semibold">
                {theme.at(0)?.toUpperCase() + theme.slice(1)}
              </span>
            </p>
          </div>
        );
      },
    }),
    {
      name: "theme",
      partialize: (state) => state.theme as never,
      merge: (persistedState, currentState) => ({
        ...currentState,
        theme: persistedState as Theme,
      }),
    }
  )
);
