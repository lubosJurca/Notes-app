'use client';

import { ArchiveIcon, ArrowRightIcon, HomeIcon } from '@/components/svg';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const NavigationLg = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Zjistím, jestli je v URL ?archived=true
  const isArchived = searchParams.get('archived') === 'true';

  return (
    <nav className='flex flex-col'>
      {/* All Notes */}
      <Link
        href={'/notes'}
        className={`${
          pathname === '/notes' && !isArchived
            ? 'bg-slate-100 dark:bg-slate-800'
            : ''
        } flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 rounded p-2`}
      >
        <span className='flex items-center gap-2'>
          <HomeIcon className='size-6' /> All Notes
        </span>
        <ArrowRightIcon className='size-6 place-items-end dark:text-slate-100' />
      </Link>

      {/* Archived Notes */}
      <Link
        href={'/notes?archived=true'}
        className={`${
          pathname === '/notes?archived=true' && isArchived
            ? 'bg-slate-100 dark:bg-slate-800'
            : ''
        } flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800  transition-all duration-300 rounded p-2`}
      >
        <span className='flex items-center gap-2'>
          <ArchiveIcon className='size-6 ' /> Archived Notes
        </span>
        <ArrowRightIcon className='size-6 place-items-end' />
      </Link>
    </nav>
  );
};

export default NavigationLg;
