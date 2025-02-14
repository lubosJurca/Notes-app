import Loading from '@/components/loading-skeleton';
import NotesList from '@/components/notes-list';

import { Suspense } from 'react';

const ArchiveNotesPage = () => {
  return (
    <section className='flex-1 mb-12 lg:mb-0 pl-2 '>
      <p className='text-neutral-700 text-sm mb-4 lg:w-72'>
        All your archived notes are stored here. You can restore or delete them
        anytime.
      </p>
      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </section>
  );
};
export default ArchiveNotesPage;
