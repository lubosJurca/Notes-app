import { z } from 'zod';

export const createNoteFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character long',
  }),
  content: z.string().min(1, {
    message: 'Content must be at least 1 character long',
  }),
  tags: z.string().min(1, {
    message: 'There must be at least 1 tag',
  }),
});

export const createNoteActionSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character long',
  }),
  content: z.string().min(1, {
    message: 'Content must be at least 1 character long',
  }),
  tags: z.string().array().min(1, {
    message: 'There must be at least 1 tag',
  }),
});

export const deleteNoteSchema = z.object({
  noteId: z.string(),
});

export const archiveNoteSchema = z.object({
  noteId: z.string(),
});
