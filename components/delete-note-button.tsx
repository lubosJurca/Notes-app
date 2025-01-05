'use client';

import { useToast } from '@/hooks/use-toast';

import { CircleCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { deleteNoteAction } from '@/actions/delete-note-action';
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
import { DeleteIcon } from '@/components/svg';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useState } from 'react';

const DeleteNoteButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    const res = await deleteNoteAction({ noteId: id });
    toast({
      description: (
        <h2 className='flex items-center gap-6'>
          <CircleCheck className='text-green-500' /> {res?.data?.body.message}
        </h2>
      ),
    });
    router.push('/notes');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setIsModalOpen(true)}
          className=' hover:scale-110 transform transition-transform'
        >
          <DeleteIcon className='text-transparent size-6' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete Note</p>
        </TooltipContent>
      </Tooltip>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='rounded-xl'>
          <DialogHeader className='flex text-start gap-4'>
            <DeleteIcon className='text-transparent size-10' />
            <div>
              <DialogTitle className='mb-2'>Delete Note</DialogTitle>
              <DialogDescription className='text-start'>
                Are you sure you want to permanently delete this note? This
                action cannot be undone.
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
              variant={'destructive'}
              onClick={() => handleDelete(id)}
            >
              Delete Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
export default DeleteNoteButton;
