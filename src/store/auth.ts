import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addGlobalHeader, removeGlobalHeader } from 'src/api/utils';
import { UserResquest, DataLogin, postLogin, postLogout } from 'src/api/auth';

export interface SessionState extends DataLogin {
  initialized: boolean;
}

const initialState: SessionState = {
  initialized: false,
  user: {
    id: '',
    displayName: '',
    photoURL: '',
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
  async ({ username, password }: UserResquest, { rejectWithValue }) => {
    try {
      const response = await postLogin({ username, password });

      if (response.statusCode === 200) {
        return response.data;
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
      const refreshToken = window.localStorage.getItem('refreshToken');
      const token = window.localStorage.getItem('token');
      const user = window.localStorage.getItem('user');

      if (user) {
        state.user = JSON.parse(atob(user));
      }

      state.token = token || '';
      state.refreshToken = refreshToken || '';
      state.initialized = true;
      addGlobalHeader('Authorization', token || '');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload = initialState }) => {
      const loginUser = { ...initialState.user, ...payload.user };

      state.initialized = true;
      state.user = loginUser;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      addGlobalHeader('Authorization', 'Bearer ' + payload.token);

      window.localStorage.setItem('refreshToken', payload.refreshToken);
      window.localStorage.setItem('token', payload.token);
      window.localStorage.setItem('user', btoa(JSON.stringify(loginUser)));
    });
    builder.addCase(login.rejected, (state, action) => {
      throw action.payload;
    });
    builder.addCase(logout.fulfilled, () => {
      removeGlobalHeader('Authorization');

      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      window.localStorage.clear();
    });
    builder.addCase(logout.rejected, (state, action) => {
      throw action.payload;
    });
  },
});

export const auth = authSlice.reducer;

export const { loadToken } = authSlice.actions;
