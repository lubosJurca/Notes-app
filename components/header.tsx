import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';

const Header = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  return (
    <header>
      <Link href={'/'}>Home</Link>
      {isUserAuthenticated ? (
        <LogoutLink>Sign out</LogoutLink>
      ) : (
        <div>
          <LoginLink>Sign in</LoginLink>
          <RegisterLink>Sign up</RegisterLink>
        </div>
      )}
    </header>
  );
};
export default Header;
