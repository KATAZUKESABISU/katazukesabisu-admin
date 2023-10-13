import { ListBlog } from 'src/types/Blog';
import { AbstractResponse, excludeInvalidValues, get } from 'src/api/utils';

export interface GetListBlogRequest {
  currentPage: number;
  title?: string;
  sortItem?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

export interface GetListBlogResponse extends AbstractResponse {
  data: ListBlog;
  currentPage: number;
  totalPage: number;
}

export const getListBlog = async (args: GetListBlogRequest) => {
  const requestBody = new URLSearchParams(excludeInvalidValues(Object.entries(args))).toString();
  const response = await get<GetListBlogResponse>('/public/list_blog?' + requestBody, {
    Authorization: 'Basic YWRtaW46YWRtaW4xMjM0NTY3OA==',
  });

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
