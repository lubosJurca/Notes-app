import { NoteCardProps } from '@/lib/types';
import ArchiveNoteButton from '../archive-note-button';
import DeleteNoteButton from '../delete-note-button';
import GoBackButton from '../go-back-button';
import RestoreNoteButton from '../restore-note-button';
import EditNoteButton from '../edit-note-button';

const Header = (note: NoteCardProps) => {
  return (
    <div className='flex justify-between items-center '>
      <GoBackButton />
      <div className='flex gap-4 items-center'>
        <EditNoteButton {...note} />
        <DeleteNoteButton id={note.id} />
        {note.archived ? (
          <RestoreNoteButton id={note.id} />
        ) : (
          <ArchiveNoteButton id={note.id} />
        )}
      </div>
    </div>
  );
};
export default Header;
