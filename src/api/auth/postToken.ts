import message from 'src/lang/en.json';
import { addGlobalHeader } from '../utils';

const SERVER_BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL || '';

const refreshToken = async (globalHeader: Map<string, string>) => {
  const remember = window.localStorage.getItem('remember');

  let refreshToken: string | null;
  let user: string | null;

  if (remember) {
    refreshToken = localStorage.getItem('refreshToken');
    user = localStorage.getItem('user');
  } else {
    refreshToken = sessionStorage.getItem('refreshToken');
    user = sessionStorage.getItem('user');
  }

  if (user === null || refreshToken === null) {
    localStorage.clear();
    sessionStorage.clear();
    throw { message: message['error.reloadPage'] };
  }

  const requestBody = {
    refreshToken,
    userId: JSON.parse(atob(user)).id,
  };

  const response = await fetch(SERVER_BASE_URL + '/api/token', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      ...Object.fromEntries(globalHeader.entries()),
    },
    body: JSON.stringify(requestBody),
  });

  const resp = await response.json();

  if (resp.statusCode === 404) {
    localStorage.clear();
    sessionStorage.clear();
    throw { message: message['error.reloadPage'] };
  }

  if (resp.statusCode !== 200) {
    throw resp;
  }

  const { data } = resp;

  if (remember) {
    localStorage.setItem('token', data.token);
  } else {
    sessionStorage.setItem('token', data.token);
  }

  addGlobalHeader('Authorization', data.token);

  return resp;
};

export default refreshToken;
