import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    content: 'Hello world',
    title: 'My first post',
    slug: 'my-first-post',
    author: {
      connectOrCreate: {
        where: {
          email: 'john@gmail.com',
        },
        create: {
          email: 'john@gmail.com',
          hashedPasword: 'hashedPassword',
        },
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const post of initialPosts) {
    const createdPost = await prisma.post.create({
      data: post,
    });
    console.log(`Created post with id: ${createdPost.id}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
