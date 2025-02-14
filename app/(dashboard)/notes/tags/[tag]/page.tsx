import GoBackButton from '@/components/go-back-button';
import Loading from '@/components/loading-skeleton';
import NotesList from '@/components/notes-list';
import { Suspense } from 'react';

const TagDetailPage = async ({
  params,
}: {
  params: Promise<{ tag: string }>;
}) => {
  const tag = (await params).tag;

  return (
    <section className='space-y-4'>
      <GoBackButton />
      <div></div>
      <h1 className='text-3xl font-semibold text-neutral-600'>
        Notes Tagged: <span className='text-neutral-950'>{tag}</span>
      </h1>
      <p className='text-neutral-700 '>
        All notes with the <span>”{tag}”</span> tag are shown here.
      </p>

      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </section>
  );
};
export default TagDetailPage;
