import TagsListSkeleton from '@/components/tag-list-skeleton';
import TagsList from '@/components/tags-list';
import { Suspense } from 'react';

const TagsPage = async () => {
  return (
    <section className='mb-12'>
      <Suspense fallback={<TagsListSkeleton />}>
        <TagsList />
      </Suspense>
    </section>
  );
};
export default TagsPage;
