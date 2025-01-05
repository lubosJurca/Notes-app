export type Tag = {
  id: string;
  name: string;
};

export type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};
export type EditNoteFormProps = {
  note: NoteCardProps;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
