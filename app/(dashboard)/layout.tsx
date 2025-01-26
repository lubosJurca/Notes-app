import Sidebar from '@/components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='container mx-auto   flex flex-col lg:flex-row px-5 pb-12 pt-8 lg:pt-0 lg:pb-0 '>
      <Sidebar />
      {children}
    </main>
  );
};
export default DashboardLayout;
