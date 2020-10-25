import { Comment } from './Comment';

export interface Blog {
  _id: string;
  image: string;
  name: string;
  date: Date;
  title: string;
  detail: string;
  viewCount: string;
  comments: Comment[];
}
