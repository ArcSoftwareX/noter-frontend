import { createJSONStorage, persist } from "zustand/middleware";
import { Note, empty } from "../notes/note";
import { create } from "zustand";
import { fetchNotes, syncNote, unsyncNote, updateNote } from "../notes";
import { RefreshCwIcon, RefreshCwOffIcon } from "lucide-react";
import { error, info } from "../toast";

export type Notes = Record<string, Note>;

type State = {
  notes: Notes;
};

type Actions = {
  set: (notes: Notes) => void;
  create: () => void;
  delete: (id: string) => void;
  get: (id: string) => Note;
  update: (id: string, note: Note) => void;
  hasNotes: () => boolean;
  cloud: Cloud;
};

type Cloud = CloudActions & CloudState;

type CloudActions = {
  initNotes: <T>(user: T | null) => void;
  sync: (id: string) => void;
  unsync: (id: string) => void;
  update: (id: string, note: Note) => void;
  fromArray: (notes: Note[]) => void;
  hideCloudNotes: () => void;
};
type CloudState = { isUpdating: boolean; isLoaded: boolean };

export const useNotes = create<Actions & State>()(
  persist<State & Actions>(
    (set, get) => ({
      notes: {},
      get: (id) => get().notes[id],
      set: (notes) => set({ notes }),
      create: () => {
        const note = empty();
        set({ notes: { [note.id]: note, ...get().notes } });
      },

      hasNotes: () => Object.keys(get().notes).length !== 0,
      update: (id, note) =>
        set({
          notes: {
            ...get().notes,
            [id]: { ...note, updated_at: new Date().toISOString() },
          },
        }),

      delete: async (id) => {
        const { notes } = get();

        if (notes[id].isCloud) await unsyncNote(id);

        delete notes[id];

        set({ notes });
      },

      cloud: {
        isLoaded: false,
        isUpdating: false,
        initNotes: async (user) => {
          if (!user) return;

          const { cloud } = get();

          if (cloud.isLoaded) return;

          const cloudNotes = await fetchNotes();

          if (!cloudNotes) return;

          cloud.fromArray(cloudNotes);
        },

        sync: async (id) => {
          const { notes } = get();

          if (!notes[id]) return;

          const syncRes = await syncNote(notes[id]);

          if (!syncRes) return error("Failed to sync note");

          const notesState: Record<string, Note> = {
            ...notes,
            [syncRes.id]: { ...syncRes, isCloud: true },
          };

          delete notesState[id];

          set((state) => ({
            ...state,
            notes: notesState,
          }));

          return info("Note synced", <RefreshCwIcon className="h-5 w-5" />);
        },

        unsync: async (id) => {
          const { notes } = get();

          if (!notes[id]) return;

          if (!(await unsyncNote(id))) return error("Failed to unsync note");

          const notesState = {
            ...notes,
            [id]: { ...notes[id], isCloud: false },
          };

          set((state) => ({
            ...state,
            notes: notesState,
          }));

          return info(
            "Note unsynced",
            <RefreshCwOffIcon className="h-5 w-5" />
          );
        },

        update: async (id, note) => {
          const { notes } = get();

          if (!notes[id]) return;

          set((state) => ({
            ...state,
            cloud: { ...state.cloud, isUpdating: true },
          }));

          const updateRes = await updateNote(id, note);

          if (!updateRes) error("Failed to update the note");

          set((state) => ({
            ...state,
            notes: {
              ...state.notes,
              [id]: { ...state.notes[id], ...updateRes },
            },
            cloud: { ...state.cloud, isUpdating: false },
          }));
        },

        fromArray: (notes) => {
          const res: Record<string, Note> = {};
          for (const n of notes) res[n.id] = { ...n, isCloud: true };

          set((state) => ({
            ...state,
            cloud: { ...state.cloud, isLoaded: true },
            notes: { ...state.notes, ...res },
          }));
        },

        hideCloudNotes: () => {
          const { notes } = get();

          for (const key in notes) if (notes[key].isCloud) delete notes[key];

          set((state) => ({ ...state, notes }));
        },
      },
    }),
    {
      name: "notes",
      partialize: (state) => {
        const notes = { ...state.notes };
        for (const key in notes) {
          if (notes[key].isCloud) delete notes[key];
        }

        return { notes } as never;
      },

      merge: (persistedState, currentState) => ({
        ...currentState,
        notes: (persistedState as { notes: Notes }).notes,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
