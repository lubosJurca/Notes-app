import { Suspense } from 'react';
import NotesList from './notes-list-beta';
import Loading from './loading-skeleton';
import CreateNotePlusButton from './create-note-plus-button';

const NotesListWrapper = () => {
  return (
    <div className='w-1/3 p-2 border-r space-y-4 hidden lg:block'>
      <CreateNotePlusButton />
      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </div>
  );
};

export default NotesListWrapper;
