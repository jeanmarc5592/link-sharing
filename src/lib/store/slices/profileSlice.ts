import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  firstName: string | null;
  lastName: string | null;
  email: string;
  picture: string | null;
}

const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  email: "",
  picture: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
    },
  }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;