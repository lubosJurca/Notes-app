import GoBackButton from '@/components/go-back-button';
import NoteCard from '@/components/note-card';
import { getNotesByTag } from '@/lib/queries/notes';

const TagDetailPage = async ({
  params,
}: {
  params: Promise<{ tag: string }>;
}) => {
  const tag = (await params).tag;

  const notes = await getNotesByTag(tag);

  return (
    <section className='space-y-4'>
      <GoBackButton />
      <div></div>
      <h1 className='text-3xl font-semibold text-neutral-600'>
        Notes Tagged: <span className='text-neutral-950'>{tag}</span>
      </h1>
      <p className='text-neutral-700 '>
        All notes with the <span>”{tag}”</span> tag are shown here.
      </p>
      <ul className='flex flex-col gap-4'>
        {notes?.map((note) => (
          <li
            key={note.id}
            className='border-b p-2 last:border-none hover:bg-slate-50 transition-all duration-300'
          >
            <NoteCard {...note} />
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TagDetailPage;
