import { AbstractResponse, post } from '../utils';

export interface PostConfirmPasswordRequest {
  code: string;
  passwordNew: string;
  email: string;
}

const postConfirmPassword = async (user: PostConfirmPasswordRequest) => {
  const response = await post<AbstractResponse>('/api/reset_password', user);
  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postConfirmPassword;
