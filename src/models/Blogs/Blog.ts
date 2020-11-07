import { Comment } from './Comment';

export interface Blog {
  _id: string;
  image: string;
  name: string;
  date: Date;
  title: string;
  subtitle: string;
  detail: string;
  viewCount: string;
  comments: Comment[];
  style: {
    backgroundColor: string;
    primary: string;
    secondary: string;
  };
}
