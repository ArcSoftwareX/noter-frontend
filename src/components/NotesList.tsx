import { AnimatePresence, motion } from "framer-motion";
import { Actions } from "@/routes/Notes";
import { forwardRef } from "react";
import { Notes } from "@/lib/state/notes";
import { NoteCard } from "./NoteCard";

interface NotesListProps {
  notes: Notes;
  actions: Actions;
}

export const NotesList = forwardRef<HTMLDivElement, NotesListProps>(
  ({ notes, actions }, ref) => {
    return (
      <div
        ref={ref}
        className="max-h-full overflow-y-scroll p-10 pt-36 scrollbar-hidden"
      >
        <motion.ul
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          initial="hidden"
          animate="show"
          className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 w-full gap-4"
          layout
        >
          <AnimatePresence>
            {Object.values(notes)
              .sort(
                (a, b) =>
                  new Date(b.updated_at).getTime() -
                  new Date(a.updated_at).getTime()
              )
              .map((note) => (
                <NoteCard note={note} actions={actions} key={note.id} />
              ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    );
  }
);

// eslint-disable-next-line react-refresh/only-export-components
export const noteCardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: { scale: 1, opacity: 1 },
};
