'use server';

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';

export async function getNote(id: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  try {
    const note = await prisma.note.findFirst({
      where: {
        id: id,
      },
      include: {
        tags: true,
      },
    });
    return note;
  } catch (error) {
    console.log(error);
  }
}
