'use client';

import { useToast } from '@/hooks/use-toast';
import { CircleCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { RestoreIcon } from '@/components/svg';
import { restoreNoteAction } from '@/actions/restore-note-action';

const RestoreNoteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const handleArchiveNote = async (id: string) => {
    try {
      await restoreNoteAction({ noteId: id });
      toast({
        title: 'Note restored',
        description: (
          <h2 className='flex items-center gap-6'>
            <CircleCheck className='text-green-500' /> Note has been restored
          </h2>
        ),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error!',
        description: 'Failed to restore note. Please try again later.',
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          className='cursor-pointer'
          onClick={() => handleArchiveNote(id)}
        >
          <RestoreIcon className='w-6 h-6 ' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Restore Note</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default RestoreNoteButton;
