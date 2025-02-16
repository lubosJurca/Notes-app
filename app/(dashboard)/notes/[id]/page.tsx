'use client';

import ActionsSection from '@/components/actions-section';
import { ClockIcon, TagIcon } from '@/components/svg';
import { Separator } from '@/components/ui/separator';
import { getNote } from '@/server/queries/note';
import { notFound, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import NoteDetailSkeleton from '@/components/note-detail-skeleton';
import { format } from 'date-fns';

const NotePage = () => {
  const params = useParams();
  const noteId = params.id;

  const { data, error, isLoading } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => getNote(noteId as string),
  });

  if (isLoading)
    return (
      <h1>
        <NoteDetailSkeleton />
      </h1>
    );
  if (error) return <h1>Error: {error.message}</h1>;
  if (!data) return notFound();

  const tags = data.tags
    .map((tag: { name: string; id: string }) => tag.name)
    .join(', ');

  return (
    <section className='space-y-3 mb-12  h-full '>
      <ActionsSection {...data} />
      <Separator />
      <div>
        <h1 className='text-3xl font-semibold mb-3'>{data?.title}</h1>
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
          <p>
            {data.updatedAt
              ? format(new Date(data.updatedAt), 'd MMMM yyyy')
              : 'Unknown'}
          </p>
        </div>
      </div>
      <Separator />
      <div className='text-balance'>
        <p style={{ whiteSpace: 'pre-line' }} className='whitespace-normal '>
          {data?.content}
        </p>
      </div>
    </section>
  );
};
export default NotePage;
