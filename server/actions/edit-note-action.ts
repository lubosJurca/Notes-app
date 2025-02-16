'use server';

import prisma from '@/server/db';
import { actionClient } from '@/server/safe-action';
import { updateNoteActionSchema } from '@/lib/schemas';
import { capitalizeFirstLetter } from '@/lib/utils';

import { revalidatePath } from 'next/cache';
import { authenticateUser } from '../queries/authenticate-user';

export const editNoteAction = actionClient
  .schema(updateNoteActionSchema)
  .action(async ({ parsedInput: { noteId, title, content, tags } }) => {
    await authenticateUser();
    try {
      const formattedTags = capitalizeFirstLetter(tags); // Např. ["Work", "Personal"]
      const uniqueTags = [...new Set(formattedTags)]; // Zajistí unikátnost tagů

      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          title,
          content,
          tags: {
            set: [],
            connectOrCreate: uniqueTags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });

      revalidatePath(`/notes/${noteId}`);
    } catch (error) {
      console.error('Unexpected error:', error);
      return {
        status: 500,
        body: {
          error: 'An unexpected error occurred while creating the note',
        },
      };
    }
  });
