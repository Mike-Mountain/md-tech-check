export interface Post {
  id: number;
  userId: number;
  username: string;
  title: string;
  body: string;
}

export interface User {
  username: string;
  posts: Post[];
}
