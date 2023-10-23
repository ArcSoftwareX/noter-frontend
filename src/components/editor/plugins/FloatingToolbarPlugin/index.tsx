import { getDOMRangeRect } from "@/lib/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  FORMAT_TEXT_COMMAND,
  $isRangeSelection,
  RangeSelection,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { Action, ActiveStyles, Toolbar } from "./Toolbar";
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "lucide-react";
import { createPortal } from "react-dom";
import { usePointerInteractions } from "../../utils/usePointerIntaractions";

const FloatingToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const { isPointerDown } = usePointerInteractions();
  const [activeStyle, setActiveStyle] = useState<ActiveStyles>({
    isBold: false,
    isCode: false,
    isHighlight: false,
    isItalic: false,
    isStrikethrough: false,
    isSubscript: false,
    isSuperscript: false,
    isUnderline: false,
  });
  const ref = useRef<HTMLDivElement | null>(null);

  const getXPos = (x1: number, x2: number) => x1 + (x2 - x1) / 2;

  const updateElementPosition = useCallback((rangeRect: DOMRect) => {
    ref.current!.style.display = "block";

    ref.current!.style.top = rangeRect.top - 40 + "px";
    ref.current!.style.left =
      getXPos(rangeRect.left, rangeRect.right) -
      ref.current!.clientWidth / 2 +
      "px";
  }, []);

  const hideElement = useCallback(() => {
    ref.current!.style.display = "none";
  }, []);

  const updateFloatingBar = useCallback(
    (selection: RangeSelection) => {
      const nativeSelection = window.getSelection();
      const editorRoot = editor.getRootElement();

      if (!nativeSelection || !editorRoot || isPointerDown) return;

      const rangeRect = getDOMRangeRect(nativeSelection, editorRoot);

      if (!rangeRect) return hideElement();

      const isSubscript = selection.hasFormat("subscript");
      const isSuperscript = selection.hasFormat("superscript");

      setActiveStyle({
        isBold: selection.hasFormat("bold"),
        isCode: selection.hasFormat("code"),
        isHighlight: selection.hasFormat("highlight"),
        isItalic: selection.hasFormat("italic"),
        isStrikethrough: selection.hasFormat("strikethrough"),
        isSubscript: isSubscript ? true : isSuperscript ? null : false,
        isSuperscript: isSuperscript ? true : isSubscript ? null : false,
        isUnderline: selection.hasFormat("underline"),
      });
      updateElementPosition(rangeRect);
    },
    [editor, hideElement, isPointerDown, updateElementPosition]
  );

  const handleSelectionChange = useCallback(() => {
    if (
      editor.isComposing() ||
      editor.getRootElement() !== document.activeElement
    )
      return hideElement();

    const selection = $getSelection();

    if (!$isRangeSelection(selection)) return hideElement();
    updateFloatingBar(selection);
  }, [editor, hideElement, updateFloatingBar]);

  useEffect(() => {
    if (!ref.current) return;

    editor.getEditorState().read(handleSelectionChange);

    const unregisterSelectionListener = editor.registerUpdateListener(
      ({ editorState }) => editorState.read(handleSelectionChange)
    );

    return () => {
      unregisterSelectionListener();
    };
  }, [editor, handleSelectionChange, hideElement, updateFloatingBar]);

  const actions: Action[] = [
    {
      icon: <BoldIcon className="h-4 w-4" />,
      key: "Bold",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold"),
    },
    {
      icon: <ItalicIcon className="h-4 w-4" />,
      key: "Italic",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic"),
    },
    {
      icon: <CodeIcon className="h-4 w-4" />,
      key: "Code",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code"),
    },
    {
      icon: <HighlighterIcon className="h-4 w-4" />,
      key: "Highlight",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight"),
    },
    {
      icon: <StrikethroughIcon className="h-4 w-4" />,
      key: "Strikethrough",
      action: () =>
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough"),
    },
    {
      icon: <SubscriptIcon className="h-4 w-4" />,
      key: "Subscript",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript"),
    },
    {
      icon: <SuperscriptIcon className="h-4 w-4" />,
      key: "Superscript",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript"),
    },
    {
      icon: <UnderlineIcon className="h-4 w-4" />,
      key: "Underline",
      action: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline"),
    },
  ];

  return createPortal(
    <Toolbar active={activeStyle} ref={ref} actions={actions} />,
    document.body
  );
};

export default FloatingToolbarPlugin;
