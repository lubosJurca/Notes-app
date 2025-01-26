import { getTags } from '@/lib/queries/tags';
import { TagIcon } from './svg';

import Link from 'next/link';

const TagsList = async () => {
  const tags = await getTags();

  return (
    <div>
      <h5 className='hidden lg:block font-semibold mb-2'>Tags</h5>
      {tags?.length === 0 && (
        <p className='border rounded p-2 mt-4 bg-neutral-100 dark:bg-neutral-800'>
          No tags have been created yet. Create a new note to start tagging.
        </p>
      )}
      <ul className='space-y-2'>
        {tags?.map((tag, index) => (
          <li key={index} className='border-b lg:border-none last:border-none'>
            <Link
              href={`/notes?tag=${tag}`}
              className='flex items-center p-4 gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 rounded'
            >
              <TagIcon className='size-4' />
              <span>{tag}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TagsList;
