import { NextRequest, NextResponse } from 'next/server';
import { getNotes, getArchivedNotes, getNotesByTag } from '@/lib/queries/notes';

// Utility function to remove undefined values
function removeUndefined(obj: any) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}

// Utility function to serialize a single note
function serializeNote(note: any) {
  return removeUndefined({
    ...note,
    createdAt:
      note.createdAt instanceof Date
        ? note.createdAt.toISOString()
        : note.createdAt,
    updatedAt:
      note.updatedAt instanceof Date
        ? note.updatedAt.toISOString()
        : note.updatedAt,
    // Add other transformations if necessary
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isArchived = searchParams.get('archived') === 'true';
  const query = searchParams.get('query') || '';
  const tag = searchParams.get('tag') || '';

  try {
    let notes: any;

    if (isArchived) {
      if (query) {
        notes = await getArchivedNotes(query);
      } else {
        notes = await getArchivedNotes();
      }
    } else {
      if (tag) {
        if (query) {
          notes = await getNotesByTag(tag, query);
        } else {
          notes = await getNotesByTag(tag);
        }
      } else if (query) {
        notes = await getNotes(query);
      } else {
        notes = await getNotes();
      }
    }

    // Check if notes is an array or a single object
    let serializedNotes: any;
    if (Array.isArray(notes)) {
      serializedNotes = notes.map((note: any) => serializeNote(note));
    } else if (notes && typeof notes === 'object') {
      serializedNotes = serializeNote(notes);
    } else {
      throw new TypeError('Notes data should be an array or an object');
    }

    return NextResponse.json(serializedNotes);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}
