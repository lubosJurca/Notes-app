'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../db';
import { redirect } from 'next/navigation';

export async function getNotes(query?: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const notes = await prisma.note.findMany({
    where: {
      user: {
        kindeId: user.id,
      },
      title: {
        contains: query,
        mode: 'insensitive',
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
}

export async function getArchivedNotes(query?: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    let notes;
    if (query) {
      notes = await prisma.note.findMany({
        where: {
          user: {
            kindeId: user.id,
          },
          archived: {
            equals: true,
          },
          title: {
            contains: query,
            mode: 'insensitive',
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
    } else {
      notes = await prisma.note.findMany({
        where: {
          user: {
            kindeId: user.id,
          },
          archived: {
            equals: true,
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
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getNotesByTag(tag: string, query?: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        user: {
          kindeId: user.id,
        },
        title: {
          contains: query,
          mode: 'insensitive',
        },
        tags: {
          some: {
            name: tag,
          },
        },
      },
      include: {
        tags: true,
      },
    });

    return notes;
  } catch (error) {
    console.log(error);
  }
}
