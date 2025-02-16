'use server';

import prisma from '@/server/db';
import { authenticateUser } from '@/server/queries/authenticate-user';
import { actionClient } from '@/server/safe-action';
import { createNoteActionSchema } from '@/lib/schemas';
import { capitalizeFirstLetter } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export const createNoteAction = actionClient
  .schema(createNoteActionSchema)
  .action(async ({ parsedInput: { title, content, tags } }) => {
    try {
      const user = await authenticateUser();

      // 2. Zpracování tagů

      const formattedTags = capitalizeFirstLetter(tags); // Např. ["Work", "Personal"]
      const uniqueTags = [...new Set(formattedTags)]; // Zajistí unikátnost tagů

      // 3. Vytvoření poznámky s relacemi
      const note = await prisma.note.create({
        data: {
          title,
          content,
          user: {
            connect: {
              kindeId: user.id, // Připojení k uživateli pomocí ID
            },
          },
          tags: {
            connectOrCreate: uniqueTags.map((tag) => ({
              where: { name: tag }, // Zkontroluje existující tag
              create: { name: tag }, // Vytvoří nový tag, pokud neexistuje
            })),
          },
        },
      });

      if (!note) {
        return {
          status: 400,
          body: {
            error: 'Failed to create note.',
          },
        };
      }

      // 4. Revalidace cesty
      revalidatePath('/(dashboard)/notes');

      return {
        status: 200,
        body: {
          message: 'Note created successfully',
        },
      };
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
