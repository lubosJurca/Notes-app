'use server';
import prisma from '@/server/db';
import { actionClient } from '@/server/safe-action';
import { archiveNoteSchema } from '@/lib/schemas';

import { revalidatePath } from 'next/cache';
import { authenticateUser } from '../queries/authenticate-user';

export const restoreNoteAction = actionClient
  .schema(archiveNoteSchema)
  .action(async ({ parsedInput: { noteId } }) => {
    await authenticateUser();

    try {
      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          archived: false,
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
          error: 'Error deleting note',
        },
      };
    }
  });
