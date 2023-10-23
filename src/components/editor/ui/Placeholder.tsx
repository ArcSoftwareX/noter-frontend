import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef } from "react";

const Placeholder = () => {
  const [editor] = useLexicalComposerContext();
  const ref = useRef<HTMLDivElement | null>(null);

  const setPos = useCallback(
    (off?: unknown) => {
      const offset = typeof off === "number" ? off : 0;

      const pos = editor.getRootElement()?.getBoundingClientRect();

      ref.current!.style.top = pos?.y + "px";
      ref.current!.style.left = (pos?.x ?? 0) + offset + "px";
    },
    [editor]
  );

  useEffect(() => {
    if (!ref.current) return;
    setPos();

    window.addEventListener("resize", setPos);

    return () => {
      window.removeEventListener("resize", setPos);
    };
  }, [setPos]);

  return (
    <div
      className="text-muted-foreground absolute pointer-events-none w-fit"
      ref={ref}
    >
      Your note starts here...
    </div>
  );
};

export default Placeholder;
