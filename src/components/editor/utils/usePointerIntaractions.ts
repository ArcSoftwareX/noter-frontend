import { useEffect, useState } from "react";

export const usePointerInteractions = () => {
  const [isPointerDown, setIsPointerDown] = useState(false);

  useEffect(() => {
    const handlePointerDown = () => setIsPointerDown(true);
    const handlePointerUp = () => setIsPointerDown(false);

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return { isPointerDown };
};
