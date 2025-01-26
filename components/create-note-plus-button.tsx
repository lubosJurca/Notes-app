'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { useState } from 'react';
import CreateNoteForm from '@/components/create-note-form';
import { PlusIcon } from '@/components/svg';

const CreateNotePlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction='right' open={isOpen} onOpenChange={setIsOpen}>
      {/* Mobile Trigger */}
      <DrawerTrigger asChild>
        <Button className='fixed bottom-24 right-5 rounded-full w-16 h-16 lg:hidden'>
          <PlusIcon style={{ width: '30px', height: '30px' }} />
        </Button>
      </DrawerTrigger>

      {/* Desktop Trigger */}
      <DrawerTrigger asChild>
        <Button className='bg-primary text-white p-2 rounded-md w-full hover:bg-primary/90 dark:hover:bg-primary/60 transition-all duration-300 hidden lg:block'>
          Create New Note
        </Button>
      </DrawerTrigger>

      <DrawerContent className='h-screen p-3 flex flex-col '>
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
