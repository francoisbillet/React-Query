export interface Post {
  id: number;
  title: string;
  content: string;
}

export type PostRequest = Omit<Post, "id">;
