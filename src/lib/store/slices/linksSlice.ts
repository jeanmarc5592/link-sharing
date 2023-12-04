import { Link } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction }from '@reduxjs/toolkit';

export interface ModifiedLink extends Link {
  isModified?: boolean;
}

interface LinksState {
  list: ModifiedLink[] | null;
}

const initialState: LinksState = {
  list: null,
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Link[]>) => {
      state.list = action.payload.map((link) => ({ ...link, isModified: false }));
    },
    updateLink: (state, action: PayloadAction<{ index: number, link: Link}>) => {
      if (state.list) {
        Object.assign(state.list[action.payload.index], { ...action.payload.link, isModified: true });
      }
    },
    reorderList: (state, action: PayloadAction<ModifiedLink[]>) => {
      state.list = action.payload.map((link) => ({ ...link, isModified: true }));
    }
  }
});

export const { setList, updateLink, reorderList } = linksSlice.actions;

export default linksSlice.reducer;