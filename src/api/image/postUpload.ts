import { AbstractResponse, post } from 'src/api/utils';

export interface UploadImageResponse extends AbstractResponse {
  data: string;
}

export const postUpload = async (args: FormData) => {
  const response = await post<UploadImageResponse>('/api/upload', args, undefined, 'multipart/form-data');

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};
