import { AbstractResponse, put } from 'src/api/utils';
import { BlogItemProps } from 'src/types/Blog';

export const putUpdateBlog = async (args: Omit<BlogItemProps, 'createDate'>) => {
  const response = await put<AbstractResponse>('/api/blog/update', args);

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
