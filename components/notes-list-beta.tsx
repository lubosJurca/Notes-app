'use client';

import NoteCard from './note-card';
import { useSearchParams } from 'next/navigation';
import { useNotes } from '@/hooks/use-notes';
import Loading from './loading-skeleton';

const NotesList = () => {
  const searchParams = useSearchParams();
  const isArchived = searchParams.get('archived') === 'true';
  const currentQuery = searchParams.get('query') || '';
  const currentTag = searchParams.get('tag') || '';

  const { notes, error, loading } = useNotes({
    isArchived,
    currentQuery,
    currentTag,
  });

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  if (!notes || notes.length === 0) {
    const message = isArchived
      ? 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.'
      : 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.';
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        {message}
      </p>
    );
  }

  return (
    <ul className='flex flex-col min-h-full  gap-4 lg:w-72 '>
      {notes.map((note) => (
        <li
          key={note.id}
          className='border-b p-2 dark:hover:bg-slate-800 last:border-none hover:bg-slate-50 transition-all duration-300'
        >
          <NoteCard {...note} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
