import NotesList from '@/components/notes-list';

const AllNotes = async () => {
  return (
    <div>
      <p className='p-4 hidden lg:block'>No Note has been selected</p>
      <div className=' lg:hidden'>
        <NotesList />
      </div>
    </div>
  );
};
export default AllNotes;
