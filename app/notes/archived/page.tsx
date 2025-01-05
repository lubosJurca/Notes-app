import Loading from '@/components/loading-skeleton';
import NotesList from '@/components/notes-list';
import { Suspense } from 'react';

const ArchiveNotesPage = () => {
  return (
    <section>
      <h1 className='text-3xl font-semibold mt-4'>Archived Notes</h1>
      <p className='text-neutral-700 text-sm'>
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>
      <Suspense fallback={<Loading />}>
        <NotesList archived={true} />
      </Suspense>
    </section>
  );
};
export default ArchiveNotesPage;
