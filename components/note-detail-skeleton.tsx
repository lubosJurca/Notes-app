import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const NoteDetailSkeleton = () => {
  return (
    <section className='space-y-3 mb-12'>
      {/* Header skeleton */}
      <div className='flex justify-between items-center'>
        <Skeleton className='h-8 w-20' />
        <div className='flex gap-2'>
          <Skeleton className='h-8 w-8' />
          <Skeleton className='h-8 w-8' />
        </div>
      </div>
      <Separator />
      {/* Title skeleton */}
      <Skeleton className='h-10 w-1/2 mb-3' />

      {/* Tags skeleton */}
      <div className='flex gap-10 mb-1'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-1/4' />
      </div>

      {/* Last edited skeleton */}
      <div className='flex gap-10'>
        <Skeleton className='h-6 w-32' />
        <Skeleton className='h-6 w-1/4' />
      </div>
      <Separator />

      {/* Content skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <Skeleton className='h-4 w-3/4' />
      </div>
    </section>
  );
};
export default NoteDetailSkeleton;
