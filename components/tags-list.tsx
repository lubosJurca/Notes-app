'use client';

import { getTags } from '@/server/queries/tags';
import { TagIcon } from './svg';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import TagsListSkeleton from './tag-list-skeleton';

const TagsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
  });

  if (isLoading) return <TagsListSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        {data?.length > 0 && (
          <>
            <h5 className='hidden lg:block font-semibold mb-2'>Tags</h5>

            <ul className='space-y-2'>
              {data?.map((tag, index) => (
                <li
                  key={index}
                  className='border-b lg:border-none last:border-none'
                >
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
          </>
        )}
      </>
    );
};
export default TagsList;
