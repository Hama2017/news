export interface News {
  id: number
  title: string
  subtitle: string
  category: string
}

export type NewsInput = Omit<News, 'id'>;
