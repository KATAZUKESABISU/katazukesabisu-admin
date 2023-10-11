import { AbstractResponse, post } from '../utils';

const postLogout = async () => {
  const response = await post<AbstractResponse>('/api/logout');
  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postLogout;
