import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/svg';

export default async function Home() {
  return (
    <main className='flex flex-col items-center gap-y-5 pt-24 text-center'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl flex flex-col items-center gap-y-4'>
            <Logo />
            Welcome to Note
          </CardTitle>
          <CardDescription>Please log in or sign up</CardDescription>
        </CardHeader>
        <CardContent className=' space-x-2'>
          <Button asChild>
            <LoginLink>Sign in</LoginLink>
          </Button>
          <Button asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
