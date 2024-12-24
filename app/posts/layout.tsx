import PostsList from '@/components/posts-list';

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PostsList />
      {children}
    </div>
  );
};
export default PostsLayout;
