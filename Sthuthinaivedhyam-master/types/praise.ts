export interface PraiseItem {
  id: number;
  text: string;
  reference: string;
}

export interface PraiseSection {
  id: number;
  title: string;
  audioFile: any;
  startId: number;
  endId: number;
  items: PraiseItem[];
} 