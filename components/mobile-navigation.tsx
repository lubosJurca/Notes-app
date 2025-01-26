import Link from 'next/link';
import SettingsButton from './settings-button';
import { ArchiveIcon, HomeIcon, SearchIcon, TagIcon } from '@/components/svg';

const MobileNavigation = () => {
  return (
    <footer className='fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-neutral-900 border-neutral-200 lg:hidden'>
      <ul className='flex justify-around p-3 w-full'>
        <li>
          <Link
            href={'/notes'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <HomeIcon className='size-6' />
            <p className='text-xs hidden sm:block'>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/notes/search'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <SearchIcon className='size-6' />
            <p className='text-xs hidden sm:block'>Search</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/notes?archived=true'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <ArchiveIcon className=' size-6 ' />
            <p className='text-xs hidden sm:block'>Archived</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/notes/tags'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <TagIcon className='size-6' />
            <p className='text-xs hidden sm:block'>Tags</p>
          </Link>
        </li>
        <li>
          <SettingsButton />
        </li>
      </ul>
    </footer>
  );
};
export default MobileNavigation;
