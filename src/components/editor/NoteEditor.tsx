import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
// import {CollaborationPlugin} from '@lexical/react/LexicalCollaborationPlugin';
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
// import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
// import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import Placeholder from "./ui/Placeholder";
import { EditorThemeClasses } from "lexical";
import { AutoSavePlugin } from "./plugins/AutoSavePlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";

const theme: EditorThemeClasses = {
  text: {
    bold: "font-bold",
    code: "font-mono",
    highlight: "bg-primary text-background",
    italic: "font-italic",
    strikethrough: "line-through",
    underline: "underline",
  },
};

export default function NoteEditor({
  editorState,
  save,
}: {
  editorState: string | null;
  save: (content: string) => void;
}) {
  const initialConfig = {
    namespace: "editor",
    onError: console.error,
    theme,
    editorState: editorState ?? undefined,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <div className="h-full w-full">
            <ContentEditable className="outline-none" />
          </div>
        }
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <AutoFocusPlugin />
      <CheckListPlugin />
      <LexicalClickableLinkPlugin />
      {/* <CollaborationPlugin /> */}
      {/* <HashtagPlugin /> */}
      <HorizontalRulePlugin />
      {/* <ListPlugin /> */}
      <TabIndentationPlugin />
      {/* <TablePlugin /> */}
      <HistoryPlugin />

      <AutoSavePlugin save={save} />
      <FloatingToolbarPlugin />
    </LexicalComposer>
  );
}
