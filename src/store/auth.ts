import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addGlobalHeader, removeGlobalHeader } from 'src/api/utils';
import { UserResquest, DataLogin, postLogin, postLogout } from 'src/api/auth';
import { binaryToString, stringToBinary } from 'src/utils/formatNumber';

export interface AuthState extends DataLogin {
  initialized: boolean;
  remember: string;
}

interface UserLoginProps extends UserResquest {
  remember: string;
}

const initialState: AuthState = {
  initialized: false,
  remember: '',
  user: {
    id: '',
    displayName: '',
    photoUrl: '',
    email: '',
    username: '',
    phone: '',
    role: 'admin',
  },
  token: '',
  refreshToken: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, remember }: UserLoginProps, { rejectWithValue }) => {
    try {
      const response = await postLogin({ username, password });

      if (response.statusCode === 200) {
        return { ...response.data, remember };
      }

      return rejectWithValue(response);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await postLogout(userId);
    if (response.statusCode === 200) {
      return true;
    }

    return rejectWithValue(response);
  } catch (e) {
    return rejectWithValue(e);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadToken(state) {
      let refreshToken: string | null;
      let token: string | null;
      let user: string | null;
      const remember = localStorage.getItem('remember');

      if (remember) {
        refreshToken = localStorage.getItem('refreshToken');
        token = localStorage.getItem('token');
        user = localStorage.getItem('user');
      } else {
        refreshToken = sessionStorage.getItem('refreshToken');
        token = sessionStorage.getItem('token');
        user = sessionStorage.getItem('user');
      }

      if (user) {
        state.user = JSON.parse(binaryToString(user));
      }

      state.token = token || '';
      state.refreshToken = refreshToken || '';
      state.initialized = true;
      if (token) {
        addGlobalHeader('Authorization', 'Bearer ' + token || '');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload = initialState }) => {
      const loginUser = { ...initialState.user, ...payload.user };

      state.initialized = true;
      state.user = loginUser;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.remember = payload.remember;
      addGlobalHeader('Authorization', 'Bearer ' + payload.token);

      localStorage.setItem('remember', payload.remember);

      if (payload.remember) {
        localStorage.setItem('refreshToken', payload.refreshToken);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', stringToBinary(JSON.stringify(loginUser)));
        return;
      }

      sessionStorage.setItem('refreshToken', payload.refreshToken);
      sessionStorage.setItem('token', payload.token);
      sessionStorage.setItem('user', stringToBinary(JSON.stringify(loginUser)));
    });
    builder.addCase(login.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(logout.fulfilled, () => {
      removeGlobalHeader('Authorization');

      const remember = localStorage.getItem('remember');

      if (remember) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        return;
      }

      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.clear();
    });
    builder.addCase(logout.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export const auth = authSlice.reducer;

export const { loadToken } = authSlice.actions;
