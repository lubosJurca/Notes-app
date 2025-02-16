import CreateNotePlusButton from '@/components/create-note-plus-button';
import Heading from '@/components/lg-heading';
import MobileHeader from '@/components/mobile-header';
import MobileHeading from '@/components/mobile-heading';
import MobileNavigation from '@/components/mobile-navigation';
import NotesListWrapper from '@/components/notes-list-wrapper';
import { getAllNotes } from '@/server/queries/get-notes';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const NotesLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: () =>
      getAllNotes({
        isArchived: false,
        query: '',
        tag: '',
      }),
  });

  return (
    <div className='flex flex-col w-full min-h-full'>
      <MobileHeader />
      <Heading />
      <MobileHeading />
      <div className='lg:hidden'>
        <CreateNotePlusButton />
      </div>

      <div className='flex min-h-full     '>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesListWrapper />
          <div className='flex-1 p-2 '>{children}</div>
        </HydrationBoundary>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default NotesLayout;
