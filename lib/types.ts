export type Tag = {
  id: string;
  name: string;
};

export type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};
