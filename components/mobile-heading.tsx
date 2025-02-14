'use client';

import { usePathname, useSearchParams } from 'next/navigation';

const MobileHeading = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isArchived = searchParams.get('archived') === 'true';
  const currentTag = searchParams.get('tag') || '';
  const isTags = pathname.includes('/notes/tags');
  const isSearch = pathname.includes('/notes/search');
  const isDetailPage = pathname.includes('/notes/') && !isTags && !isSearch;

  let title = 'All Notes';
  if (isArchived) {
    title = 'Archived Notes';
  } else if (currentTag) {
    title = `Notes with tag: ${currentTag}`;
  } else if (isTags) {
    title = 'Tags';
  } else if (isSearch) {
    title = 'Search';
  }

  return (
    <h1
      className={`${
        isDetailPage ? 'hidden' : 'block'
      } text-2xl lg:hidden font-semibold border-b pb-2`}
    >
      {title}
    </h1>
  );
};
export default MobileHeading;
