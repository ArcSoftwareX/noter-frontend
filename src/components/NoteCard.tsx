import { Note } from "@/lib/notes/note";
import { MoreVerticalIcon, RefreshCwIcon, StickyNoteIcon } from "lucide-react";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/DropdownMenu";
import { motion } from "framer-motion";
import { Actions } from "@/routes/Notes";
import { noteCardVariants } from "./NotesList";
import { Suspense, lazy } from "react";
import { ActivityIndicator } from "./ui/ActivityIndicator";

const NoteContentPreview = lazy(() => import("./NoteContentPreview"));

export const NoteCard = ({
  note,
  actions,
}: {
  note: Note;
  actions: Actions;
}) => {
  const runAction = (
    e: { stopPropagation: () => void },
    action: (id: string) => void
  ) => {
    e.stopPropagation();
    action(note.id);
  };

  return (
    <motion.li
      transition={{ type: "just" }}
      variants={noteCardVariants}
      className="rounded-lg border border-border group"
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.1 } }}
      layout="position"
    >
      <Link to={`/notes/${note.id}`}>
        <div className="w-full h-40 border-b border-b-border">
          {note.content ? (
            <Suspense
              fallback={
                <div className="h-full w-full flex items-center justify-center">
                  <ActivityIndicator className="h-6 w-6" />
                </div>
              }
            >
              <div className="line-clamp-4 p-4 text-sm">
                <NoteContentPreview content={note.content} />
              </div>
            </Suspense>
          ) : (
            <div className="text-xs font-semibold text-muted-foreground flex items-center justify-center h-full w-full flex-col">
              <StickyNoteIcon
                strokeWidth={1.2}
                className="mb-2 translate-y-4 group-hover:translate-y-0 will-change-transform transition-transform h-10 w-10 duration-300"
              />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                Empty note
              </span>
            </div>
          )}
        </div>
        <div className="px-5 py-4 w-full relative group-hover:bg-secondary/50 transition-colors duration-300">
          <div className="text-xs text-muted-foreground">
            {new Date(note.updated_at).toDateString()}
          </div>
          <div className="font-semibold flex items-center gap-1">
            <span className="line-clamp-1 overflow-hidden text-ellipsis max-w-[80%]">
              {note.title ?? "Untitled"}
            </span>
            {note.isCloud ? (
              <RefreshCwIcon className="h-4 w-4 text-muted-foreground" />
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground">
            {note.description ?? "No description"}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="absolute right-4 top-4">
              <Button variant="outline" size="icon">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {actions
                .filter((ac) => ac.canPerform(note))
                .map((ac) => (
                  <DropdownMenuItem
                    onClick={(e) => runAction(e, ac.action)}
                    key={ac.name}
                  >
                    <div
                      className={`mr-2 h-4 w-4 ${
                        ac.type === "destructive" ? "text-destructive" : ""
                      }`}
                    >
                      {ac.icon}
                    </div>
                    <span
                      className={
                        ac.type === "destructive" ? "text-destructive" : ""
                      }
                    >
                      {ac.name}
                    </span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
    </motion.li>
  );
};
