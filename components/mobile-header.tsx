import { Logo } from './svg';
import { ModeToggle } from './theme-toggle';

const MobileHeader = () => {
  return (
    <header className=' w-full pb-4 lg:hidden flex justify-between items-center'>
      <Logo />
      <ModeToggle />
    </header>
  );
};
export default MobileHeader;
