import { AbstractResponse, post } from '../utils';

export interface UserResquest {
  email: string;
}

const postForgetPassword = async (user: UserResquest) => {
  const response = await post<AbstractResponse>('/api/forget_password', user);
  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postForgetPassword;
