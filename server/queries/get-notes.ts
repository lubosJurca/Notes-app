'use server';

import prisma from '@/server/db';
import { authenticateUser } from './authenticate-user';

export async function getAllNotes() {
  const user = await authenticateUser();

  try {
    const notes = await prisma.note.findMany({
      where: {
        user: {
          kindeId: user.id,
        },
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notes;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch notes');
  }
}
