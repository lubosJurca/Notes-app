import PostsList from '@/components/posts-list';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LogoutLink>Logout</LogoutLink>
      {/* <PostsList /> */}
      {children}
    </div>
  );
};
export default PostsLayout;
