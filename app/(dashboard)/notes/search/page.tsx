import Loading from '@/components/loading-skeleton';
import NotesList from '@/components/notes-list';

import SearchInput from '@/components/search-input';
import { Suspense } from 'react';

const SearchPage = async (props: {
  searchParams?: Promise<{ query?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <section className='space-y-4'>
      <SearchInput />
      {query && (
        <p className=' text-neutral-600'>
          All notes matching &quot;{query}&quot; are displayed below
        </p>
      )}
      <Suspense fallback={<Loading />}>
        <NotesList />
      </Suspense>
    </section>
  );
};
export default SearchPage;
