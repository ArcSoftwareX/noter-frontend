import { Button } from "./ui/Button";
import { CommandIcon } from "lucide-react";
import { useCommandPalette } from "@/lib/state/commandPalette";
import { useNotes } from "@/lib/state/notes";
import Logo from "./Logo";

type Action = { name: string; shortcut: string; func: (() => unknown) | null };

export default function Welcome() {
  const { open } = useCommandPalette();
  const { create } = useNotes();

  const actions: Action[] = [
    { name: "Create a note", shortcut: "Q", func: create },
    { name: "Command palette", shortcut: "P", func: open },
    { name: "Launch tutorial", shortcut: "H", func: null },
  ];

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <Logo className="h-36 w-36 mb-6" />
      <h1 className="text-xl text-primary/90 font-semibold">
        Welcome to Noter
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        It looks like you are new. Try this out.
      </p>
      {actions.map(({ func, name, shortcut }) => (
        <ActionButton
          func={func}
          name={name}
          shortcut={shortcut}
          key={shortcut}
        />
      ))}
    </div>
  );
}

const ActionButton = ({ func, name, shortcut }: Action) => {
  return (
    <Button
      disabled={!func}
      onClick={func!}
      variant="ghost"
      className="flex justify-between w-64 text-muted-foreground outline-none"
    >
      {name}
      <kbd className="flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-sm font-medium opacity-100 sm:flex">
        <CommandIcon className="h-3.5 w-3.5" />
        {shortcut}
      </kbd>
    </Button>
  );
};
