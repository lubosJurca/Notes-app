'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { createNoteFormSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { TagIcon } from '@/components/svg';
import { CircleCheck } from 'lucide-react';
import { EditNoteFormProps } from '@/lib/types';
import { editNoteAction } from '@/actions/edit-note-action';

const EditNoteForm = ({ note, setIsDrawerOpen }: EditNoteFormProps) => {
  const form = useForm<z.infer<typeof createNoteFormSchema>>({
    resolver: zodResolver(createNoteFormSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags.map((tag) => tag.name).join(', '),
    },
  });
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof createNoteFormSchema>) {
    // Split the tags by commas, trim the whitespace, and remove any empty strings
    const tagsArray = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    // Update the form values with the sanitized tags
    const updatedValues = {
      ...values,
      tags: tagsArray,
      noteId: note.id,
    };

    try {
      await editNoteAction(updatedValues);
      toast({
        description: (
          <h2 className='flex items-center gap-6'>
            <CircleCheck className='text-green-500' /> "Note has been updated"
          </h2>
        ),
      });
      form.reset();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong',
        description: 'Please try again later.',
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3 flex flex-col h-full '
      >
        <h1 className='text-4xl font-semibold'>Edit Note</h1>
        <div className='flex justify-end w-full '>
          <Button
            type='button'
            variant='ghost'
            className='text-lg'
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant={'ghost'}
            className='text-blue-500 text-lg disabled:animate-pulse transition-all'
            disabled={form.formState.isSubmitting}
          >
            Save Note
          </Button>
        </div>
        <Separator />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Enter a title...'
                  {...field}
                  className='text-3xl  font-bold border-none'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center pl-2 space-x-2 text-base'>
                <TagIcon className='size-6' /> <span>Tags</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Add tags separated by commas (e.g. Work, Planning)'
                  {...field}
                  className='border-none'
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormMessage />
              <FormControl>
                <Textarea
                  placeholder='Start typing your note here...'
                  minLength={1}
                  className='focus-visible:outline-none  h-full    font'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default EditNoteForm;
