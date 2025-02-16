'use client';

import NoteCard from './note-card';
import { useSearchParams } from 'next/navigation';
import Loading from './loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { getAllNotes } from '@/server/queries/get-notes';
import { NoteCardProps } from '@/lib/types';

const NotesList = () => {
  const searchParams = useSearchParams();
  const isArchived = searchParams.get('archived') === 'true';
  const currentQuery = searchParams.get('query') || '';
  const currentTag = searchParams.get('tag') || '';

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', isArchived, currentQuery, currentTag],
    queryFn: () =>
      getAllNotes({ isArchived, query: currentQuery, tag: currentTag }),
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  if (isArchived && currentQuery && data && data.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        There are no archived notes matching your search query.
      </p>
    );
  }

  if (currentQuery && data && data.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        There are no notes matching your search query.
      </p>
    );
  }

  if (isArchived && data && data.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        You don’t have any archived notes yet. Archive a note to remove it from
        your main list.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        You don’t have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </p>
    );
  }

  if (data)
    return (
      <ul className='flex flex-col min-h-full  gap-4  overflow-hidden '>
        {data.map((note: NoteCardProps) => (
          <li
            key={note.id}
            className='border-b p-2 dark:border-b-slate-400 dark:hover:bg-slate-800 last:border-none hover:bg-slate-50 transition-all duration-300'
          >
            <NoteCard {...note} />
          </li>
        ))}
      </ul>
    );
};

export default NotesList;
