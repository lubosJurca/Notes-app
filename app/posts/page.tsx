import { createPost } from '@/actions/create-post';

import DeletePostButton from '@/components/delete-post-button';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

import Link from 'next/link';

const AllPosts = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const posts = await prisma.post.findMany({
    where: {
      author: {
        kindeId: user.id,
      },
    },
  });

  return (
    <main className='container mx-auto min-h-screen flex flex-col pt-24 gap-y-5 items-center  '>
      <h1 className='text-3xl font-semibold'>All Posts ({posts.length})</h1>
      <ul className='border-t border-b py-5 leading-8 '>
        {posts.map((post) => (
          <li key={post.id} className='flex items-center justify-between px-5'>
            <Link href={`/posts/${post.id}`}>{post.title} </Link>
            <DeletePostButton id={post.id} />
          </li>
        ))}
      </ul>
      <form action={createPost} className='flex flex-col gap-y-2 w-[300px]'>
        <input
          type='text'
          name='title'
          placeholder='Title'
          className='px-2 py-1 rounded-sm text-black'
        />
        <textarea
          name='content'
          rows={5}
          placeholder='Content'
          className='px-2 py-1 rounded-sm text-black'
        />
        <button
          type='submit'
          className='px-2 py-1 rounded-sm bg-foreground text-background'
        >
          Add Post
        </button>
      </form>
    </main>
  );
};
export default AllPosts;
