import homeIcon from '@/public/icon-home.svg';
import searchIcon from '@/public/icon-search.svg';
import archiveIcon from '@/public/icon-archive.svg';
import tagIcon from '@/public/icon-tag.svg';
import settingsIcon from '@/public/icon-settings.svg';
import Image from 'next/image';
import Link from 'next/link';
import HomeIcon from './icons/home-icon';

const MobileNavigation = () => {
  return (
    <footer>
      <ul className='flex justify-around p-3 w-full'>
        <li>
          <Link href={'/notes'} className='flex flex-col items-center'>
            <Image src={homeIcon} alt='Home Icon' />
            <p className='text-xs hidden sm:block'>Home</p>
          </Link>
        </li>
        <li>
          <Link href={'/notes'}>
            <Image src={searchIcon} alt='Search Icon' />
          </Link>
        </li>
        <li>
          <Link href={'/notes'}>
            <Image src={archiveIcon} alt='Archive Icon' />
          </Link>
        </li>
        <li>
          <Link href={'/notes'}>
            <Image src={tagIcon} alt='Tag Icon' />
          </Link>
        </li>
        <li>
          <Link href={'/notes'}>
            <Image src={settingsIcon} alt='Settings Icon' />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
export default MobileNavigation;
