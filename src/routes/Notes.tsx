import Logo from "@/components/Logo";
import { NotesList } from "@/components/NotesList";
import { ActivityIndicator } from "@/components/ui/ActivityIndicator";
import { Button } from "@/components/ui/Button";
import { Note } from "@/lib/notes/note";
import { useUser } from "@/lib/state/auth";
import { useNotes } from "@/lib/state/notes";
import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import {
  PlusCircleIcon,
  RefreshCwIcon,
  RefreshCwOffIcon,
  TrashIcon,
} from "lucide-react";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export type Actions = Action[];

export type Action = {
  name: string;
  icon: ReactNode;
  type: "default" | "destructive";
  action: (id: string) => void;
  canPerform: (note: Note) => boolean | undefined;
};

export default function Notes() {
  const {
    notes,
    delete: _deleteNote,
    hasNotes,
    create,
    cloud: { isLoaded, sync, unsync },
  } = useNotes();

  const { user } = useUser();

  const navigate = useNavigate();

  const checkNotes = useCallback(() => {
    if (!hasNotes()) navigate("/", { replace: true });
  }, [hasNotes, navigate]);

  const deleteNote = (id: string) => {
    _deleteNote(id);
    checkNotes();
  };

  const syncNote = (id: string) => {
    sync(id);
  };

  const unsyncNote = (id: string) => {
    unsync(id);
  };

  useEffect(() => {
    checkNotes();
  }, [checkNotes]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll({ container: containerRef, axis: "y" });

  const headerHeight = useTransform(scrollY, [0, 200], [128, 64], {
    ease: easeInOut,
  });
  const headerLogoSize = useTransform(scrollY, [0, 200], [40, 28]);
  const headerSize = useTransform(scrollY, [0, 200], ["36px", "20px"], {
    ease: easeInOut,
  });
  const headerWeight = useTransform(scrollY, [0, 200], [700, 500]);

  const actions: Actions = [
    {
      name: "Stop Sync",
      icon: <RefreshCwOffIcon className="h-4 w-4" />,
      type: "default",
      action: unsyncNote,
      canPerform: (note) => note.isCloud && user !== null,
    },
    {
      name: "Sync",
      icon: <RefreshCwIcon className="h-4 w-4" />,
      type: "default",
      action: syncNote,
      canPerform: (note) => !note.isCloud && user !== null,
    },
    {
      name: "Delete",
      icon: <TrashIcon className="h-4 w-4" />,
      type: "destructive",
      action: deleteNote,
      canPerform: () => true,
    },
  ];

  return (
    <div className="w-full h-screen">
      <motion.header
        className="fixed top-0 inset-x-0 backdrop-blur-xl z-50 flex items-center px-10 gap-4"
        style={{ height: headerHeight }}
      >
        <motion.div
          style={{ height: headerLogoSize }}
          className="flex items-center"
        >
          {isLoaded ? (
            <Logo className="h-full w-full" />
          ) : (
            <ActivityIndicator className="h-6 w-6" />
          )}
        </motion.div>
        <motion.h1
          className="font-bold whitespace-nowrap"
          style={{ fontSize: headerSize, fontWeight: headerWeight }}
        >
          {user
            ? `Hello, ${user.name ?? user.email.split("@")[0]}`
            : "Your notes"}
        </motion.h1>
        <span className="flex-1" />
        <Button
          onClick={create}
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <PlusCircleIcon />
        </Button>
      </motion.header>
      <NotesList ref={containerRef} actions={actions} notes={notes} />
    </div>
  );
}
