import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

interface ProfileState extends Partial<User> {
  isModified?: boolean;
}

const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  email: "",
  picture: null,
  isModified: false,
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
      state.showRemoveLinkModal = action.payload.showRemoveLinkModal;
      state.isModified = false;
    },
    updateProfileInfo: (state, action: PayloadAction<{ firstName: string | null; lastName: string | null; email: string; }>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.isModified = true;
    },
    updateProfilePicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    }
  }
});

export const { setProfile, updateProfileInfo, updateProfilePicture } = profileSlice.actions;

export default profileSlice.reducer;