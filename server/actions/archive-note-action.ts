'use server';
import prisma from '@/server/db';
import { authenticateUser } from '@/server/queries/authenticate-user';
import { actionClient } from '@/server/safe-action';
import { archiveNoteSchema } from '@/lib/schemas';

import { revalidatePath } from 'next/cache';

export const archiveNoteAction = actionClient
  .schema(archiveNoteSchema)
  .action(async ({ parsedInput: { noteId } }) => {
    await authenticateUser();

    try {
      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          archived: true,
        },
      });

      revalidatePath(`/notes/${noteId}`);

      return {
        status: 200,
        body: {
          message: 'Note archived',
        },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        body: {
          error: 'An unexpected error occurred while creating the note',
        },
      };
    }
  });
