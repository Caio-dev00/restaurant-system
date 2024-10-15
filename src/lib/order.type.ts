
export interface OrderProps{
  id: string;
  table: number;
  name: string;
  draft: boolean;
  status: boolean;
  created_at?: string;
}