export interface Department {
  _id: string;
  date: Date;
  images: string[];
  imageFolder: string;
  title: string;
  about: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}
