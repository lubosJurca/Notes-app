'use client';

import { NoteCardProps } from '@/lib/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { EditIcon } from '@/components/svg';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import EditNoteForm from '@/components/edit-note-form';

const EditNoteButton = (note: NoteCardProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => setIsDrawerOpen(true)}
          className=' hover:scale-110 transform transition-transform'
        >
          <EditIcon className=' size-5' />
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Note</p>
        </TooltipContent>
      </Tooltip>
      <Drawer
        direction='right'
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerContent className='h-screen p-3 flex flex-col'>
          <DrawerHeader>
            <VisuallyHidden.Root>
              <DrawerTitle>Edit Note</DrawerTitle>
              <DrawerDescription>Edit a note</DrawerDescription>
            </VisuallyHidden.Root>
          </DrawerHeader>
          <EditNoteForm note={note} setIsDrawerOpen={setIsDrawerOpen} />
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
};
export default EditNoteButton;
