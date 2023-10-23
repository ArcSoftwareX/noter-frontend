import { id } from "../utils";

export interface Note {
  id: string;
  author_id: string | null;

  title: string | null;
  description: string | null;
  content: string | null;

  tags: string[] | null;

  updated_at: string;
  created_at: string;

  isCloud?: boolean;
}

export const empty = (): Note => ({
  id: id(),
  author_id: null,
  title: null,
  content: null,
  description: null,
  tags: null,
  updated_at: new Date(Date.now()).toISOString(),
  created_at: new Date(Date.now()).toISOString(),
  isCloud: false,
});
