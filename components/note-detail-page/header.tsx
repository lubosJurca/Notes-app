import ArchiveNoteButton from '../archive-note-button';
import DeleteNoteButton from '../delete-note-button';
import GoBackButton from '../go-back-button';
import RestoreNoteButton from '../restore-note-button';

const Header = ({ id, isArchived }: { id: string; isArchived: boolean }) => {
  return (
    <div className='flex justify-between items-center '>
      <GoBackButton />
      <div className='flex gap-4 items-center'>
        <DeleteNoteButton id={id} />
        {isArchived ? (
          <RestoreNoteButton id={id} />
        ) : (
          <ArchiveNoteButton id={id} />
        )}
      </div>
    </div>
  );
};
export default Header;
