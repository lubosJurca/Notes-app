'use server';
import prisma from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { deleteNoteSchema } from '@/lib/schemas';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { revalidatePath } from 'next/cache';

export const deleteNoteAction = actionClient
  .schema(deleteNoteSchema)
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
