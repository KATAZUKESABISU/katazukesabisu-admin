export interface BlogItemProps {
  title: string;
  published: number;
  createDate: string;
  content: string;
  image: string;
  id: string;
}

export interface ListBlog {
  title: string;
  createDate: string;
  content: BlogItemProps[];
}
