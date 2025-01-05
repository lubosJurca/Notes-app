import { NoteCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const NoteCard = (data: NoteCardProps) => {
  return (
    <Link
      href={`/notes/${data.id}`}
      className='space-y-4 p-2 cursor-pointer hover:text-blue-500  transition-all'
    >
      <h2 className='text-2xl font-semibold'>{data.title}</h2>

      <div className='space-x-1'>
        {data.tags.map((tag) => (
          <span className='bg-neutral-200 px-2 py-1 rounded' key={tag.id}>
            {tag.name}
          </span>
        ))}
      </div>

      <p>{formatDate(data.createdAt)}</p>
    </Link>
  );
};
export default NoteCard;
