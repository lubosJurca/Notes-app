import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { LogoutIcon, SettingsIcon } from '@/components/svg';

const redirectUri =
  process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? 'http://localhost:3000/';

const SettingsButton = () => {
  console.log(redirectUri);
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='border-none outline-none flex flex-col'>
          <SettingsIcon className='hover:rotate-180  transition-all duration-500 size-6' />
          <p className='text-xs hidden sm:block lg:hidden'>Settings</p>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSeparator />
          <LogoutLink postLogoutRedirectURL={'https://www.google.com'}>
            <MenubarItem className='cursor-pointer'>
              <LogoutIcon className='mr-2 size-4 ' />
              Logout
            </MenubarItem>
          </LogoutLink>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default SettingsButton;
