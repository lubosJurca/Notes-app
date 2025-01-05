import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { SettingsIcon } from '@/components/svg';

const SettingsButton = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='border-none outline-none'>
          <SettingsIcon className='hover:rotate-180 transition-all duration-500 w-8 h-8' />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Delete Account</MenubarItem>
          <MenubarSeparator />
          <LogoutLink>
            <MenubarItem className='cursor-pointer'>Logout</MenubarItem>
          </LogoutLink>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default SettingsButton;
