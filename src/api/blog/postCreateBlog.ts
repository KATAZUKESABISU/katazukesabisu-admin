import { AbstractResponse, post } from 'src/api/utils';
import { BlogItemProps } from 'src/types/Blog';

export const postCreateBlog = async (args: Omit<BlogItemProps, 'createDate' | 'id'>) => {
  const response = await post<AbstractResponse>('/api/blog/create', 'admin', args);

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
