import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: { id: string; email: string } | null;
  role: 'admin' | 'user' | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        role: 'admin' | 'user';
      }>,
    ) {
      state.user = { id: action.payload.id, email: action.payload.email };
      state.role = action.payload.role;
    },
    logout(state) {
      state.user = null;
      state.role = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
