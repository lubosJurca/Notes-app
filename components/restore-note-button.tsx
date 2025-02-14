'use client';

import { useToast } from '@/hooks/use-toast';
import { CircleCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RestoreIcon } from '@/components/svg';
import { restoreNoteAction } from '@/server/actions/restore-note-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const RestoreNoteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: restoreNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: 'Note restored',
        description: (
          <h2 className='flex items-center gap-6'>
            <CircleCheck className='text-green-500' /> Note has been restored
          </h2>
        ),
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error!',
        description: 'Failed to restore note. Please try again later.',
      });
    },
  });

  return (
    // <TooltipProvider>
    //   <Tooltip>
    //     <TooltipTrigger
    //       asChild
    //       className='cursor-pointer'
    //       onClick={() => mutation.mutate({ noteId: id })}
    //     >
    //       <RestoreIcon className='w-6 h-6 ' />
    //     </TooltipTrigger>
    //     <TooltipContent>
    //       <p>Restore Note</p>
    //     </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setIsModalOpen(true)}
          className=' hover:scale-110 transform transition-transform'
        >
          <RestoreIcon className=' size-6' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Restore Note</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='rounded-xl'>
          <DialogHeader className='flex text-start gap-4'>
            <RestoreIcon className=' size-10' />
            <div>
              <DialogTitle className='mb-2'>Restore Note</DialogTitle>
              <DialogDescription className='text-start'>
                Are you sure you want to restore this note? You can find it in
                the All Notes section and archive it anytime.
              </DialogDescription>
            </div>
          </DialogHeader>
          <Separator />
          <DialogFooter className='flex justify-end gap-4'>
            <DialogClose asChild>
              <Button type='button' variant={'secondary'}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='button'
              className='dark:text-slate-100'
              variant={'default'}
              onClick={() => mutation.mutate({ noteId: id })}
            >
              Restore Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
export default RestoreNoteButton;
