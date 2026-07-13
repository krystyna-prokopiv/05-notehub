import axios from "axios";
import type { Note } from "../types/note";

export interface NotesQueryParams {
  search: string;
  page: number;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  perPage: number;
  sortBy: "created" | "updated";
}
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export async function fetchNotes(data: NotesQueryParams) {
  const res = await axios.get<{ notes: Note[]; totalPages: number }>(
    "https://notehub-public.goit.study/api/notes",
    {
      data,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );

  return res.data;
}

export async function createNote({ title, tag, content }: Note) {
  const { data } = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    { tag, title, content },
  );

  return data;
}

export async function deleteNote(id: Note): Promise<void> {
  await axios.delete(`https://notehub-public.goit.study/api/notes${id}`);
}
