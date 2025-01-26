'use server';

import { getNotes, getArchivedNotes, getNotesByTag } from '@/lib/queries/notes';
import { revalidatePath } from 'next/cache';

export async function fetchNotes(
  archived: boolean,
  query: string,
  tag: string
) {
  try {
    let notes;
    if (tag) {
      notes = await getNotesByTag(tag);
    } else if (archived) {
      notes = await getArchivedNotes();
    } else {
      notes = await getNotes(query);
    }

    // revalidatePath('/notes');
    return { notes };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return { error: 'Failed to fetch notes' };
  }
}
