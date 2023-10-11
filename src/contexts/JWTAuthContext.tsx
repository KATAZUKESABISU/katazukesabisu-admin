import React, { Reducer, createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Loading from '../components/loading';

interface AuthState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  isInitialised?: boolean;
  isAuthenticated?: boolean
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
  isAuthenticated: false
};

// const isValidToken = (accessToken) => {
//   if (!accessToken) return false;

//   const decodedToken = jwtDecode(accessToken);
//   const currentTime = Date.now() / 1000;
//   return decodedToken.exp > currentTime;
// };

// const setSession = (accessToken) => {
//   if (accessToken) {
//     localStorage.setItem('accessToken', accessToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     localStorage.removeItem('accessToken');
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// const reducer = (state: AuthContextProps, action) => {
const reducer = (state: AuthState, action: Action<string, AuthState>) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case 'LOGIN': {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case 'LOGOUT': {
      return { ...state, isAuthenticated: false, user: null };
    }

    case 'REGISTER': {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

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

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { user } = response.data;

    dispatch({ type: 'LOGIN', payload: { user } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT', payload: initialState });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/auth/profile');
        dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: data.user } });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialised) return <Loading />;

  return (
    <AuthContext.Provider value={{ ...state, method: 'JWT', login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;