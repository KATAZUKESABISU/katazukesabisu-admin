import { AbstractResponse, post } from 'src/api/utils';

export const postDeleteBlog = async (blogId: string) => {
  const response = await post<AbstractResponse>('/api/blog/delete', { id: blogId });

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
