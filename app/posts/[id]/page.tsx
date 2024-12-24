import { editPost } from '@/actions/edit-post';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

type Params = Promise<{ id: string }>;

const Post = async ({ params }: { params: Params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: (await params).id,
    },
  });

  return (
    <main className='flex flex-col items-center gap-y-5 pt-24 text-center'>
      <h1 className='text-3xl font-semibold'>{post?.title}</h1>
      <p>{post?.content}</p>

      <form action={editPost} className='flex flex-col gap-y-2 w-[300px]'>
        <input type='hidden' name='id' value={post?.id} />
        <input
          type='text'
          name='title'
          placeholder='Title'
          defaultValue={post?.title}
          className='px-2 py-1 rounded-sm text-black'
        />
        <textarea
          name='content'
          rows={5}
          placeholder='Content'
          defaultValue={post?.content}
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
export default Post;
