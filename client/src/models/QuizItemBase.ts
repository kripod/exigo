import QuizItemType from './QuizItemType';

export default interface QuizItemBase<T extends QuizItemType, S> {
  id: string;
  type: T;
  stem: string;
  solution?: S;
}
