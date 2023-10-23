import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot, $getSelection, $setSelection } from "lexical";

export default function NoteContentPreview({ content }: { content: string }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: renderHtml(content) }} />
      &nbsp;
    </div>
  );
}

const renderHtml = (content: string) => {
  const editor = createHeadlessEditor();

  editor.setEditorState(editor.parseEditorState(content));

  let html = "";

  editor.update(() => {
    const sel = $getRoot().select();
    sel.anchor.offset = 0;
    sel.focus.offset = 3;
    $setSelection(sel);
    html = $generateHtmlFromNodes(editor, $getSelection());
  });

  return html;
};
