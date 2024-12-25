import MobileNavigation from '@/components/mobile-navigation';

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='container flex flex-col p-3  min-h-screen'>
      <div>header</div>
      {children}
      <MobileNavigation />
    </main>
  );
};
export default NotesLayout;
