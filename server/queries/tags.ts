'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/server/db';

export const getTags = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    const userNotes = await prisma.note.findMany({
      where: {
        user: {
          kindeId: user.id,
        },
      },
      include: {
        tags: true,
      },
    });
    // Vytvoříme Set pro uložení unikátních tagů
    const uniqueTags = new Set<string>();

    // Projdeme všechny poznámky a jejich tagy a přidáme je do Setu
    userNotes.forEach((note) => {
      note.tags.forEach((tag) => {
        uniqueTags.add(tag.name);
      });
    });

    // Převedeme Set na pole pro snadnější použití
    const tagsArray = Array.from(uniqueTags);

    return tagsArray;
  } catch (error) {
    console.log(error);
  }
};
