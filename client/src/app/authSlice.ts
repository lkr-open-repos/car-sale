import { createSlice } from "@reduxjs/toolkit";

export interface IRootState {
  auth: {
    user: { id: string; email: string } | null;
    token: string | null;
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    //problem is around here
    setAuth: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, signOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: IRootState) => state.auth.user;
export const selectCurrentToken = (state: IRootState) => state.auth.token;
