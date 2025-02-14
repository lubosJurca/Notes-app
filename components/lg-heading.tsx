'use client';

import SearchInput from '@/components/search-input';
import SettingsButton from '@/components/settings-button';
import { useSearchParams } from 'next/navigation';
import { ModeToggle } from '@/components/theme-toggle';

const Heading = () => {
  const searchParams = useSearchParams();
  const isArchived = searchParams.get('archived') === 'true';
  const currentTag = searchParams.get('tag') || '';

  let title = 'All Notes';
  if (isArchived) {
    title = 'Archived Notes';
  } else if (currentTag) {
    title = `Notes with tag: ${currentTag}`;
  }

  return (
    <div className=' items-center hidden lg:flex  justify-between border-b dark:border-b-slate-400 px-2 py-4'>
      <div className='text-3xl font-semibold  '>{title}</div>
      <div className='flex items-center gap-4'>
        <ModeToggle />
        <SearchInput />
        <SettingsButton />
      </div>
    </div>
  );
};
export default Heading;
