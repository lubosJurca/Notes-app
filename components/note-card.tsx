'use client';

import { NoteCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const NoteCard = (data: NoteCardProps) => {
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();
  const href = currentParams
    ? `/notes/${data.id}?${currentParams}`
    : `/notes/${data.id}`;

  return (
    <Link href={href} className='cursor-pointer '>
      <h2 className='text-2xl font-semibold'>{data.title}</h2>

      <div className='space-x-1 my-4'>
        {data.tags.map((tag) => (
          <span
            className='bg-neutral-200 dark:text-slate-800  px-2 py-1 rounded'
            key={tag.id}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <p>{formatDate(new Date(data.createdAt))}</p>
    </Link>
  );
};
export default NoteCard;
