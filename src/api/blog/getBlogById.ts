import { BlogItemProps } from 'src/types/Blog';
import { AbstractResponse, get } from 'src/api/utils';

export interface GetBlogByIdResponse extends AbstractResponse {
  data: BlogItemProps;
}

export const getBlogById = async (blogId: string) => {
  const response = await get<GetBlogByIdResponse>(`/public/blog/${blogId}`);

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
