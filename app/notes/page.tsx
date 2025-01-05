import NotesList from '@/components/notes-list';
import { Suspense } from 'react';
import Loading from '@/components/loading-skeleton';

const AllNotes = async () => {
  return (
    <section className='flex-1 '>
      <h1 className='text-3xl font-semibold mt-4'>All Notes</h1>
      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </section>
  );
};
export default AllNotes;
