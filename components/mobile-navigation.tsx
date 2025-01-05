import Link from 'next/link';
import SettingsButton from './settings-button';
import { ArchiveIcon, HomeIcon, SearchIcon, TagIcon } from '@/components/svg';

const MobileNavigation = () => {
  return (
    <footer className='fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200'>
      <ul className='flex justify-around p-3 w-full'>
        <li>
          <Link
            href={'/notes'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <HomeIcon className='w-8 h-8' />
            <p className='text-xs hidden sm:block'>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/notes'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <SearchIcon className='w-8 h-8' />
          </Link>
        </li>
        <li>
          <Link
            href={'/notes/archived'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <ArchiveIcon className='text-transparent w-8 h-8 ' />
          </Link>
        </li>
        <li>
          <Link
            href={'/notes'}
            className='flex flex-col items-center hover:scale-110 transform transition-transform'
          >
            <TagIcon className='w-8 h-8' />
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
