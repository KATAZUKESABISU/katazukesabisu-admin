import React, { createContext, useReducer } from 'react';

import Loading from '../components/loading';
import { removeGlobalHeader, addGlobalHeader } from '../api/utils';
import { postLogin, postLogout } from '../api/auth';

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  isInitialised?: boolean;
  isAuthenticated?: boolean;
  refreshToken?: string;
}

interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

const userAdmin = {
  displayName: 'Nguyễn Hoàng Anh',
  email: 'nguyen.hoang.anh@example.com',
  photoURL: '/assets/images/avatars/avatar_10.jpg',
  role: 'Admin',
};

const initialState: AuthState = {
  user: userAdmin,
  isInitialised: false,
  isAuthenticated: false,
};

const reducer = (state: AuthState, action: Action<string, AuthState>) => {
  switch (action.type) {
    case 'LOGIN': {
      const { user, refreshToken } = action.payload;
      return { ...state, isAuthenticated: true, isInitialised: true, user, refreshToken };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'FORGET_PASSWORD':
    case 'RESET_PASSWORD':
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: (_: string, __: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);

  const login = async (username: string, password: string) => {
    const response = await postLogin({ username, password });
    const { user, token, refreshToken } = response.data;

    // add token to global header
    addGlobalHeader('Authorization', token);
    localStorage.setItem('token', refreshToken);

    // Save user to AuthProvider
    dispatch({ type: 'LOGIN', payload: { user, refreshToken } });
  };

  const logout = async () => {
    // Remove token
    removeGlobalHeader('Authorization');
    localStorage.removeItem('token');

    // Call API logout
    dispatch({ type: 'LOGOUT', payload: initialState });

    // Logout
    await postLogout();
  };

  // SHOW LOADER
  if (!state.isInitialised) return <Loading />;

  return <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
