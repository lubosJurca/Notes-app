import { Logo } from '@/components/svg';
import NavigationLg from '@/components/navigation-lg';
import { Separator } from '@/components/ui/separator';
import TagsList from '@/components/tags-list';

const Sidebar = () => {
  return (
    <aside className='hidden lg:block w-64 border-r min-h-screen mt-6 space-y-4'>
      <Logo />
      <NavigationLg />
      <Separator />
      <TagsList />
    </aside>
  );
};
export default Sidebar;
