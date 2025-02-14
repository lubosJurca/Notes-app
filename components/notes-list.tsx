'use client';

import NoteCard from './note-card';
import { useSearchParams } from 'next/navigation';
import Loading from './loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { getAllNotes } from '@/server/queries/get-notes';
import { useMemo } from 'react';

const NotesList = () => {
  const searchParams = useSearchParams();
  const isArchived = searchParams.get('archived') === 'true';
  const currentQuery = searchParams.get('query') || '';
  const currentTag = searchParams.get('tag') || '';

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getAllNotes,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const filteredNotes = useMemo(() => {
    if (isArchived && data) {
      if (currentQuery) {
        return data.filter(
          (note) =>
            note.archived &&
            note.title.toLowerCase().includes(currentQuery.toLowerCase())
        );
      }
      return data.filter((note) => note.archived);
    }

    if (currentQuery && data) {
      return data.filter((note) =>
        note.title.toLowerCase().includes(currentQuery.toLowerCase())
      );
    }

    if (currentTag && data) {
      return data.filter((note) =>
        note.tags.map((tag) => tag.name).includes(currentTag)
      );
    }

    return data;
  }, [data, isArchived, currentQuery, currentTag]);

  if (isArchived && filteredNotes && filteredNotes.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        You don’t have any archived notes yet. Archive a note to remove it from
        your main list.
      </p>
    );
  }

  if (!filteredNotes || filteredNotes.length === 0) {
    return (
      <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
        You don’t have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </p>
    );
  }

  return (
    <ul className='flex flex-col min-h-full  gap-4  overflow-hidden '>
      {filteredNotes.map((note) => (
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
