import { ListBlog } from 'src/types/Blog';
import { AbstractResponse, excludeInvalidValues, get } from 'src/api/utils';

export interface GetListBlogRequest {
  currentPage: number;
  title?: string;
  sortItem?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  published?: number;
}

export interface GetListBlogResponse extends AbstractResponse {
  data: ListBlog;
  currentPage: number;
  totalPage: number;
  totalRecord: number;
}

export const getListBlog = async (args: GetListBlogRequest) => {
  const requestBody = new URLSearchParams(excludeInvalidValues(Object.entries(args))).toString();
  const response = await get<GetListBlogResponse>('/api/blog?' + requestBody);

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
