'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import CreateNoteForm from './create-note-form';

const CreateNotePlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction='right' open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <Button
          asChild
          variant='default'
          className='fixed bottom-24 right-5 rounded-full w-16 h-16'
        >
          <PlusIcon size={12} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-screen p-3 flex flex-col'>
        <DrawerHeader>
          <VisuallyHidden.Root>
            <DrawerTitle>Create Note</DrawerTitle>
            <DrawerDescription>Create a new note drawer</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <CreateNoteForm setIsOpen={setIsOpen} />
      </DrawerContent>
    </Drawer>
  );
};
export default CreateNotePlusButton;
