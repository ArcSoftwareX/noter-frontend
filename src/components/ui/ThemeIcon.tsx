import { MoonIcon, SparklesIcon, SunIcon } from "lucide-react";

export const ThemeIcon = ({
  theme,
  iconSize,
}: {
  theme: "light" | "dark" | "system";
  iconSize: number;
}) => {
  return theme === "dark" ? (
    <MoonIcon size={iconSize} />
  ) : theme === "light" ? (
    <SunIcon size={iconSize} />
  ) : (
    <SparklesIcon size={iconSize} />
  );
};
