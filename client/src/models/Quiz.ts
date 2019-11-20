import QuizItem from './QuizItem';

export interface Quiz {
  id: string;
  title: string;
  timeLimit?: number;
  items: QuizItem[];
}
