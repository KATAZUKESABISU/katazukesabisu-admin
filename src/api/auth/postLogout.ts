import { AbstractResponse, post } from '../utils';

const postLogout = async (userId: string) => {
  const response = await post<AbstractResponse>('/api/logout', { userId });

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postLogout;
