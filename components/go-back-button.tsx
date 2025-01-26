'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { ArrowLeftIcon } from '@/components/svg';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant={'link'}
      className='text-neutral-600 px-0 dark:text-slate-100'
      onClick={() => router.back()}
    >
      <ArrowLeftIcon /> Go back
    </Button>
  );
};
export default GoBackButton;
