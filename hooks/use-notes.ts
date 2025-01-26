import { useState, useEffect, useCallback } from 'react';
import { NoteCardProps } from '@/lib/types';

interface UseNotesParams {
  isArchived?: boolean;
  currentQuery?: string;
  currentTag?: string;
}

export function useNotes({
  isArchived,
  currentQuery,
  currentTag,
}: UseNotesParams) {
  const [notes, setNotes] = useState<NoteCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('All Notes');

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (isArchived) {
        setTitle('Archived Notes');
        params.append('archived', 'true');
      }
      if (currentQuery) {
        setTitle('Search Results');
        params.append('query', currentQuery);
      }
      if (currentTag) {
        setTitle(`Searched tag: ${currentTag}`);
        params.append('tag', currentTag);
      }

      const response = await fetch(`/api/notes?${params.toString()}`, {
        method: 'GET',
        cache: 'no-store', // Ensure fresh data on each request
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      const data = await response.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [isArchived, currentQuery, currentTag]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return { notes, loading, error, title };
}
