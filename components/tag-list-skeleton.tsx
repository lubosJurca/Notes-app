import { Skeleton } from '@/components/ui/skeleton'; // Adjust the path if needed

const TagsListSkeleton = () => {
  return (
    <ul className='animate-pulse'>
      {[...Array(3)].map((_, index) => (
        <li key={index} className='border-b last:border-none'>
          <div className='flex items-center py-4 gap-3  rounded'>
            <Skeleton className='h-5 w-5 rounded-full' />
            <Skeleton className='h-3 w-25' />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TagsListSkeleton;
