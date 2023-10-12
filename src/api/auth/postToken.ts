import { AbstractResponse, post } from '../utils';
import { UserInformation } from '.';

export interface RefreshTokenRequest {
  user: UserInformation;
  refreshToken: string;
}

const postToken = async (requestBody: RefreshTokenRequest) => {
  const response = await post<AbstractResponse>('/api/token', requestBody);

  if (response.statusCode !== 200) {
    throw response;
  }

  return response;
};

export default postToken;
