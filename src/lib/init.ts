import { useEffect } from "react";
import { registerShortcuts } from "./shortcuts";
import { useTheme } from "./state/theme";
import { useUser } from "./state/auth";
import { useNotes } from "./state/notes";

export const useInitializers = () => {
  const { applyTheme } = useTheme();
  const { initUser, user } = useUser();
  const {
    cloud: { initNotes },
  } = useNotes();

  useEffect(() => {
    applyTheme();
    initUser();
    const unregisterShortcuts = registerShortcuts();

    return () => unregisterShortcuts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initNotes(user);
  }, [initNotes, user]);
};
