import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export const AutoSavePlugin = ({
  save,
}: {
  save: (content: string) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener((content) => {
      save(
        content.editorState.isEmpty()
          ? ""
          : JSON.stringify(content.editorState.toJSON())
      );
    });

    return () => {
      unregister();
    };
  }, [editor, save]);

  return null;
};
