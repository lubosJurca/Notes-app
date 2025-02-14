import QueryProvider from '@/providers/query-provider';
import Sidebar from '@/components/sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <main className='container mx-auto   flex flex-col lg:flex-row px-5 pb-12 pt-8 lg:pt-0 lg:pb-0 '>
        <Sidebar />
        {children}
      </main>
    </QueryProvider>
  );
};
export default DashboardLayout;
