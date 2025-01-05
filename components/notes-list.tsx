import { getArchivedNotes, getNotes } from '@/lib/queries/notes';
import NoteCard from './note-card';
import { Separator } from '@/components/ui/separator';

type NotesListProps = {
  archived?: boolean;
};

const NotesList = async (
  { archived }: NotesListProps = { archived: false }
) => {
  let notes;

  try {
    if (archived) {
      notes = await getArchivedNotes();
    } else {
      notes = await getNotes();
    }
  } catch (error) {
    console.error('Error fetching notes', error);
    return <p>Error loading notes.</p>;
  }

  if (!notes || notes.length === 0) {
    const message = archived
      ? 'No notes have been archived yet. Move notes here for safekeeping, or create a new note.'
      : 'You don’t have any notes yet. Start a new note to capture your thoughts and ideas.';
    return <p className='border rounded p-2 mt-4 bg-neutral-100 '>{message}</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard {...note} />
          <Separator />
        </li>
      ))}
    </ul>
  );
};
export default NotesList;
