export interface Document {
  id: number;
  title: string | null;
  documents: Document[];
  content: string;
  createdAt: string;
  updatedAt: string;
}
