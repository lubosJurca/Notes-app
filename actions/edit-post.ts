'use server';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function editPost(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return;
  }

  try {
    await prisma.post.update({
      where: {
        id: formData.get('id') as string,
      },
      data: {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/posts');
  redirect('/posts');
}
