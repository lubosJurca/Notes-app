import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

const PostsList = async () => {
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
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PostsList;
