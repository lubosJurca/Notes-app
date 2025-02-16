'use server';

import prisma from '@/server/db';
import { authenticateUser } from './authenticate-user';

export const getAllNotes = async ({
  isArchived,
  query,
  tag,
}: {
  isArchived?: boolean;
  query?: string;
  tag?: string;
}) => {
  const user = await authenticateUser();

  console.log('User: ', user);

  try {
    const notes = await prisma.note.findMany({
      where: {
        user: {
          kindeId: user.id,
        },
        archived: isArchived ?? undefined,
        title: query ? { contains: query, mode: 'insensitive' } : undefined,
        tags: tag
          ? {
              some: {
                name: tag,
              },
            }
          : undefined,
      },
      include: {
        tags: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    console.log('Notes: ', notes);
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Failed to fetch notes');
  }
};
