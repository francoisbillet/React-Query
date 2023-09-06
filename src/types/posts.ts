export interface Post {
  id: number;
  // userId: number;
  title: string;
  content: string;
}

export type PostRequest = Omit<Post, "id">;
