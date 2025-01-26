import CreateNotePlusButton from '@/components/create-note-plus-button';
import Heading from '@/components/lg-heading';
import MobileHeader from '@/components/mobile-header';
import MobileHeading from '@/components/mobile-heading';
import MobileNavigation from '@/components/mobile-navigation';
import NotesListWrapper from '@/components/notes-list-wrapper';

const NotesLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col w-full h-full p-2'>
      <MobileHeader />
      <Heading />
      <MobileHeading />
      <div className='lg:hidden'>
        <CreateNotePlusButton />
      </div>

      <div className='flex min-h-screen   '>
        <NotesListWrapper />
        <div className='w-full p-2 '>{children}</div>
      </div>

      <MobileNavigation />
    </div>
  );
};

export default NotesLayout;
