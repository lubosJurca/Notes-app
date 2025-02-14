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

  const formattedDate = formatDate(new Date(data.createdAt));
  const formatTitle =
    data.title.length > 30 ? data.title.slice(0, 30) + '...' : data.title;

  return (
    <Link
      href={href}
      className='cursor-pointer flex flex-col w-full  flex-wrap overflow-hidden'
    >
      <h2 className='text-2xl font-semibold'>{formatTitle}</h2>

      <ul className='space-x-1 my-4 flex gap-1 flex-wrap '>
        {data.tags.map((tag) => (
          <li
            className='bg-neutral-200 dark:text-slate-800  p-1 rounded'
            key={tag.id}
          >
            {tag.name}
          </li>
        ))}
      </ul>

      <p>{formattedDate}</p>
    </Link>
  );
};
export default NoteCard;
