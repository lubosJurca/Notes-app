'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../db';
import { redirect } from 'next/navigation';

export async function getNotes() {
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

export async function getArchivedNotes() {
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
