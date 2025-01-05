'use server';
import prisma from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { archiveNoteSchema } from '@/lib/schemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const restoreNoteAction = actionClient
  .schema(archiveNoteSchema)
  .action(async ({ parsedInput: { noteId } }) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return {
        status: 401,
        body: {
          error: 'Unauthorized: User not found',
        },
      };
    }

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
