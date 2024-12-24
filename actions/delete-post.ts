'use server';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { revalidatePath } from 'next/cache';

export async function deletePost(id: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return;
  }

  try {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/posts');
}
