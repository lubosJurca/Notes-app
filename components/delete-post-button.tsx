'use client';

import { deletePost } from '@/actions/delete-post';
import { TrashIcon } from 'lucide-react';

const DeletePostButton = ({ id }: { id: string }) => {
  return (
    <button>
      <TrashIcon className='text-red-500' onClick={() => deletePost(id)} />
    </button>
  );
};
export default DeletePostButton;
