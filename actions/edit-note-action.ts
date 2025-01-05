'use server';

import prisma from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { updateNoteActionSchema } from '@/lib/schemas';
import { capitalizeFirstLetter } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const editNoteAction = actionClient
  .schema(updateNoteActionSchema)
  .action(async ({ parsedInput: { noteId, title, content, tags } }) => {
    try {
      // 1. Získání aktuálního uživatele
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) {
        return {
          status: 401,
          body: {
            error: 'Unauthorized: User not found',
          },
        };
      }

      // 2. Zpracování tagů

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
            connectOrCreate: uniqueTags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });

      revalidatePath(`/notes/${noteId}`);

      //   return NextResponse.json({ message: 'Note updated successfully' });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error:', error.message);
        return {
          status: 400,
          body: {
            error: `Database error: ${error.message}`,
          },
        };
      }

      console.error('Unexpected error:', error);
      return {
        status: 500,
        body: {
          error: 'An unexpected error occurred while creating the note',
        },
      };
    }
  });
