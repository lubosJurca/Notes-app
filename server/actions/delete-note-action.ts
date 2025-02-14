'use server';
import prisma from '@/server/db';
import { actionClient } from '@/server/safe-action';
import { deleteNoteSchema } from '@/lib/schemas';

import { revalidatePath } from 'next/cache';
import { authenticateUser } from '../queries/authenticate-user';

export const deleteNoteAction = actionClient
  .schema(deleteNoteSchema)
  .action(async ({ parsedInput: { noteId } }) => {
    await authenticateUser();

    try {
      await prisma.note.delete({
        where: {
          id: noteId,
        },
      });

      revalidatePath('/notes');

      return {
        status: 200,
        body: {
          message: 'Note deleted',
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
