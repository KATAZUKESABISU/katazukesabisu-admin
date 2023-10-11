import { AbstractResponse, post } from '../utils';

export interface UserResquest {
  username: string;
  password: string;
}

export interface UserInformation {
  id: string;
  photoURL: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
}

export interface DataLogin {
  user: UserInformation;
  token: string;
  refreshToken: string;
}

interface PostLoginResponse extends AbstractResponse {
  data: DataLogin;
}

const postLogin = async (user: UserResquest) => {
  const response = await post<PostLoginResponse>('/api/login', user);
  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postLogin;
