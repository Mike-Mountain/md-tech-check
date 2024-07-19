export interface Post {
  id: number;
  userId: number;
  username: string;
  image: string;
  title: string;
  body: string;
}

export interface User {
  username: string;
  id: number;
  posts: Post[];
}
