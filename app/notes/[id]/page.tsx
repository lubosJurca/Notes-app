import Header from '@/components/note-detail-page/header';
import { ClockIcon, TagIcon } from '@/components/svg';
import { Separator } from '@/components/ui/separator';
import { getNote } from '@/lib/queries/note';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const noteId = (await params).id;
  const note = await getNote(noteId);

  if (!note) {
    return notFound();
  }

  const tags = note.tags.map((tag) => tag.name).join(', ');
  const lastEdited = formatDate(note.updatedAt);

  return (
    <section className='space-y-3 mb-12'>
      <Header id={note?.id} isArchived={note.archived} />
      <Separator />
      <div>
        <h1 className='text-3xl font-semibold mb-3'>{note?.title}</h1>
        <div className='flex gap-10 mb-1 text-sm'>
          <h4 className='flex items-center gap-2 w-32'>
            <TagIcon className='size-4' /> Tags
          </h4>
          <p>{tags}</p>
        </div>
        <div className='flex gap-10 text-sm'>
          <h4 className='flex items-center gap-2 w-32 '>
            <ClockIcon className='size-4' /> Last edited
          </h4>
          <p>{lastEdited}</p>
        </div>
      </div>
      <Separator />
      <p style={{ whiteSpace: 'pre-line' }}>{note?.content}</p>
    </section>
  );
};
export default NotePage;
