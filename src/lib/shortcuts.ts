import { useCommandPalette } from "./state/commandPalette";
import { useNotes } from "./state/notes";
import { useTheme } from "./state/theme";

export const registerShortcuts = () => {
  const paletteState = useCommandPalette.getState();
  const themeState = useTheme.getState();
  const notesState = useNotes.getState();

  const shortcutHandler = (e: KeyboardEvent) => {
    const key = e.key;
    const action = e.metaKey || e.ctrlKey;

    if (action) {
      switch (key) {
        case "p":
          paletteState.open();
          break;
        case "m":
          themeState.switchTheme();
          break;
        case "q":
          notesState.create();
          break;
        default:
          return;
      }

      e.preventDefault();
    }
  };

  window.addEventListener("keydown", shortcutHandler);

  return () => window.removeEventListener("keydown", shortcutHandler);
};
