import axios from "axios";
import type { Note } from "../types/note";
export type CreateNoteParams = Omit<Note, "id" | "createdAt" | "updatedAt">;

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
      params: data,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );

  return res.data;
}

export async function createNote(values: CreateNoteParams) {
  const { data } = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    {
      values,
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    },
  );
  return data;
}
