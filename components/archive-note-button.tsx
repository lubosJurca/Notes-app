'use client';

import { archiveNoteAction } from '@/server/actions/archive-note-action';

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

import { ArchiveIcon } from '@/components/svg';
import { useState } from 'react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ArchiveNoteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: archiveNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: 'Note archived',
        description: (
          <h2 className='flex items-center gap-6'>
            <CircleCheck className='text-green-500' /> Note has been archived
          </h2>
        ),
      });

      setIsModalOpen(false);
      // router.push('/notes?archived=true');
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: 'Error!',
        description: 'Failed to archive note. Please try again later.',
      });
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setIsModalOpen(true)}
          className=' hover:scale-110 transform transition-transform'
        >
          <ArchiveIcon className=' size-6' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Archive Note</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='rounded-xl'>
          <DialogHeader className='flex text-start gap-4'>
            <ArchiveIcon className=' size-10' />
            <div>
              <DialogTitle className='mb-2'>Archive Note</DialogTitle>
              <DialogDescription className='text-start'>
                Are you sure you want to archive this note? You can find it in
                the Archived Notes section and restore it anytime.
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
              disabled={mutation.isPending}
              onClick={() => mutation.mutate({ noteId: id })}
            >
              Archive Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
export default ArchiveNoteButton;
