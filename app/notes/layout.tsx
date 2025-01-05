import CreateNotePlusButton from '@/components/create-note-plus-button';
import MobileHeader from '@/components/mobile-header';
import MobileNavigation from '@/components/mobile-navigation';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='container mx-auto  flex flex-col px-5 pb-12 pt-8 min-h-screen'>
      <MobileHeader />
      {children}
      <CreateNotePlusButton />
      <MobileNavigation />
    </main>
  );
};
export default NotesLayout;
