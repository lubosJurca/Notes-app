'use server';

import prisma from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { createNoteActionSchema } from '@/lib/schemas';
import { capitalizeFirstLetter, tagsFromString } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createNoteAction = actionClient
  .schema(createNoteActionSchema)
  .action(async ({ parsedInput: { title, content, tags } }) => {
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

      // 3. Vytvoření poznámky s relacemi
      await prisma.note.create({
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

      // 4. Revalidace cesty
      revalidatePath('/notes');

      return {
        status: 200,
        body: {
          message: 'Note created successfully',
        },
      };
    } catch (error) {
      // 5. Chytřejší zpracování chyb
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
