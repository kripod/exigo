import QuizItemType from './QuizItemType';

export default interface QuizItemBase<T extends QuizItemType, S> {
  type: T;
  id: number;
  stem: string;
  solution?: S;
}
