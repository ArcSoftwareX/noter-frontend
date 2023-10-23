import { useNotes } from "@/lib/state/notes";
import { Link, useParams } from "react-router-dom";
import { type Note } from "@/lib/notes/note";
import TopBar from "@/components/TopBar";
import NotFound from "./NotFound";
import { ChangeEvent, Suspense, lazy, useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { ChevronLeftIcon, SaveIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useDebounce } from "@/lib/utils";
import { UploadIcon, WatchIcon } from "@/components/ui/Icons";

const NoteEditor = lazy(() => import("@/components/editor/NoteEditor"));

export default function Note() {
  const {
    update,
    cloud: { update: updateCloud, isLoaded, isUpdating },
    get,
  } = useNotes();
  const noteId = useParams().id;

  const [note, setNote] = useState<Note | null>(noteId ? get(noteId) : null);
  const [isChanged, setisChanged] = useState(false);
  const debouncedNote = useDebounce(note);

  useEffect(() => {
    setisChanged(true);
  }, [note]);

  useEffect(() => {
    if (!debouncedNote) return;

    console.log("sync note");

    debouncedNote.isCloud
      ? updateCloud(debouncedNote.id, debouncedNote)
      : update(debouncedNote.id, debouncedNote);
    setisChanged(false);
  }, [debouncedNote, update, updateCloud]);

  useEffect(() => {
    setNote(noteId ? get(noteId) : null);
  }, [get, isLoaded, noteId]);

  if (!noteId) return <NotFound />;
  if (!note && !isLoaded) return "loading note from cloud";

  if (!note && isLoaded) return <NotFound />;

  const setTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNote((prev) =>
      prev
        ? { ...prev, title: e.target.value.length ? e.target.value : null }
        : null
    );
  };

  const setDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setNote((prev) =>
      prev
        ? {
            ...prev,
            description: e.target.value.length ? e.target.value : null,
          }
        : null
    );

  return (
    <div className="max-h-screen w-screen overflow-y-scroll scrollbar-hidden pb-10">
      <TopBar title={note!.title ?? "Untitled"} desc={note!.description} />
      <div className="2xl:max-w-7xl xl:max-w-6xl lg:max-w-4xl md:max-w-3xl sm:max-w-none mx-auto px-10 pt-20">
        <Link
          to="/notes"
          className={buttonVariants({
            variant: "ghost",
            className: "text-muted-foreground pl-2",
          })}
        >
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          My notes
        </Link>
        <input
          className="placeholder:text-muted-foreground bg-transparent text-primary w-full outline-none mt-10"
          placeholder="No description"
          value={note!.description ?? ""}
          onChange={setDescription}
        />
        <input
          className="text-4xl font-bold placeholder:text-muted-foreground bg-transparent text-primary w-full outline-none mb-6"
          placeholder="Untitled"
          value={note!.title ?? ""}
          onChange={setTitle}
        />
        <Suspense
          fallback={
            <div className="w-full">
              {[1, 2, 3, 4].map((id) => (
                <Skeleton className="h-24 mb-4" key={id} />
              ))}
            </div>
          }
        >
          <NoteEditor
            editorState={note!.content}
            save={(content) =>
              setNote((prev) => (prev ? { ...prev, content } : null))
            }
          />
        </Suspense>
      </div>
      <div className="text-muted-foreground fixed left-10 bottom-10 flex items-center text-sm gap-2 px-3 py-2 rounded-lg backdrop-blur-xl">
        <NoteStateIndicator
          state={
            note?.isCloud
              ? isUpdating
                ? "Saving"
                : isChanged
                ? "Unsaved"
                : "Saved"
              : null
          }
        />
      </div>
    </div>
  );
}

const NoteStateIndicator = ({
  state,
}: {
  state: "Saving" | "Saved" | "Unsaved" | null;
}) => {
  return state ? (
    <>
      {state === "Saved" ? (
        <SaveIcon className="h-5 w-5" />
      ) : state === "Saving" ? (
        <UploadIcon className="h-5 w-5" />
      ) : (
        <WatchIcon className="w-5 h-5" />
      )}{" "}
      {state}
    </>
  ) : (
    <>
      <SaveIcon className="h-5 w-5" />
      Saved locally
    </>
  );
};
