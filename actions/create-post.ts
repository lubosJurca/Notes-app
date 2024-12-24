'use server';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await prisma.post.create({
      data: {
        title: formData.get('title') as string,
        content: formData.get('content') as string,

        author: {
          connect: {
            email: user.email as string,
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user must have a unique email'
        );
      }
    }
  }

  revalidatePath('/posts');
}
