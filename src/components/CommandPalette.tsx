import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "./ui/CommandPalette";
import {
  CloudIcon,
  CogIcon,
  Command,
  PlusCircleIcon,
  SaveIcon,
  UserCircle2Icon,
} from "lucide-react";
import { useTheme } from "../lib/state/theme";
import { ThemeIcon } from "./ui/ThemeIcon";
import { useCommandPalette } from "@/lib/state/commandPalette";
import { useNotes } from "@/lib/state/notes";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/state/auth";

export default function CommandPalette() {
  const { isOpen, set, close } = useCommandPalette();
  const { switchTheme, theme } = useTheme();
  const { create, notes } = useNotes();
  const { user } = useUser();
  const navigate = useNavigate();

  const itemHandler = (func: () => void) => {
    func();
    close();
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={set}>
      <CommandInput placeholder="Search Noter..." />
      <CommandList>
        <CommandGroup heading="Notes">
          <CommandItem onSelect={() => itemHandler(create)}>
            <PlusCircleIcon className="mr-2" />
            <span>Create note</span>
            <CommandShortcut className="flex items-center">
              <Command className="scale-75" />Q
            </CommandShortcut>
          </CommandItem>
          {Object.values(notes).map((note, idx) => (
            <CommandItem
              key={note.id}
              onSelect={() => itemHandler(() => navigate(`/notes/${note.id}`))}
            >
              <span className="mr-3 max-w-[30%] whitespace-nowrap overflow-hidden text-ellipsis">
                {note.title ?? "Untitled-" + idx}
              </span>
              <span className="text-muted-foreground text-sm max-w-[50%] whitespace-nowrap overflow-hidden text-ellipsis">
                {note.description}
              </span>
              <span className="text-muted-foreground ml-2">
                {note.isCloud ? (
                  <CloudIcon className="h-2 w-2 scale-90" />
                ) : (
                  <SaveIcon className="h-2 w-2 scale-90" />
                )}
              </span>
              <CommandShortcut>Enter</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() =>
              itemHandler(() =>
                user
                  ? navigate("/account")
                  : navigate("/auth/sign-in?redirect_url=%2Faccount")
              )
            }
          >
            <UserCircle2Icon className="mr-2" />
            <span>Account</span>
          </CommandItem>
          <CommandItem>
            <CogIcon size={18} className="mr-2" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => itemHandler(switchTheme)}>
            <ThemeIcon iconSize={18} theme={theme} />
            <span className="ml-2">Switch theme</span>
            <CommandShortcut className="flex items-center">
              <Command className="scale-75" />M
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
