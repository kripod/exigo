import QuizItem from './QuizItem';

export interface Quiz {
  title: string;
  timeLimit?: number;
  items: QuizItem[];
}
