import { Suspense } from 'react';
import NotesList from './notes-list';
import Loading from './loading-skeleton';
import CreateNotePlusButton from './create-note-plus-button';

const NotesListWrapper = async () => {
  return (
    <div className='w-64  border-r dark:border-r-slate-400 space-y-4 hidden lg:flex  lg:flex-col p-2 '>
      <CreateNotePlusButton />
      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </div>
  );
};

export default NotesListWrapper;
