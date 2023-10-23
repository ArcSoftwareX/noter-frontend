import axios from "axios";
import { BACKEND_URL } from "../constants";
import { Note } from "./note";

export const fetchNotes = async () => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/notes`, {
      withCredentials: true,
    });

    return data.notes;
  } catch (e) {
    return null;
  }
};

export const syncNote = async (note: Note) => {
  try {
    const { data } = await axios.post(`${BACKEND_URL}/notes`, note, {
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return null;
  }
};

export const unsyncNote = async (id: string) => {
  try {
    const { status } = await axios.delete(`${BACKEND_URL}/notes/${id}`, {
      withCredentials: true,
    });

    return status === 200;
  } catch (e) {
    return false;
  }
};

export const updateNote = async (id: string, note: Partial<Note>) => {
  const { data } = await axios.put(`${BACKEND_URL}/notes/${id}`, note, {
    withCredentials: true,
  });

  return data;
};
