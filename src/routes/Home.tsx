import Welcome from "@/components/Welcome";
import { useNotes } from "@/lib/state/notes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { hasNotes, notes } = useNotes();

  useEffect(() => {
    if (hasNotes()) navigate("/notes", { replace: true });
  }, [hasNotes, navigate, notes]);

  return (
    <div className="w-screen h-full">
      <Welcome />
    </div>
  );
}
