import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const Loading = () => {
  return (
    <div className='flex flex-col mt-4 space-y-4 '>
      <div className='flex flex-col   w-full space-y-4'>
        <Skeleton className='h-8 w-1/3 ' />
        <div className='flex gap-2'>
          <Skeleton className='h-6 w-1/12 rounded' />
          <Skeleton className='h-6 w-1/12 rounded' />
        </div>
        <Skeleton className='h-6 w-1/4 ' />
      </div>
      <Separator />
      <div className='flex flex-col   w-full space-y-4 p-2'>
        <Skeleton className='h-8 w-1/3 ' />
        <div className='flex gap-2'>
          <Skeleton className='h-6 w-1/12 rounded' />
          <Skeleton className='h-6 w-1/12 rounded' />
        </div>
        <Skeleton className='h-6 w-1/4 ' />
      </div>
      <Separator />
      <div className='flex flex-col   w-full space-y-4 p-2'>
        <Skeleton className='h-8 w-1/3 ' />
        <div className='flex gap-2'>
          <Skeleton className='h-6 w-1/12 rounded' />
          <Skeleton className='h-6 w-1/12 rounded' />
        </div>
        <Skeleton className='h-6 w-1/4 ' />
      </div>
    </div>
  );
};
export default Loading;
