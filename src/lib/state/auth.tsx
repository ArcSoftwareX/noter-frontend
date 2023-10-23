import { create } from "zustand";
import { me, signIn, signOut } from "../auth";
import { User } from "../auth/user";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

export type State = {
  user: User | null;
  isLoading: boolean;
};

export type Actions = {
  signIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  initUser: () => Promise<void>;
};

export const useUser = create<State & Actions>((set, get) => ({
  user: null,
  isLoading: false,
  signIn: async (email, password) =>
    set({
      user: await signIn(email, password),
    }),
  signOut: async () => {
    if (!(await signOut())) {
      toast(
        <div className="flex items-center gap-4">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p>Failed to sign out</p>
        </div>
      );
      return;
    }
    set({ user: null });
  },
  initUser: async () => {
    const { user, isLoading } = get();

    if (user || isLoading) return;

    set({ isLoading: true });

    const respUser = await me();

    set({ user: respUser, isLoading: false });

    return;
  },
}));
