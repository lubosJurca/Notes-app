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

export interface ActionSuccess {
  status: 200;
  body: {
    message: string;
  };
}

export interface ActionError {
  status: number;
  body: {
    error: string;
  };
}

export type ActionResponse = ActionSuccess | ActionError;
