import { Link } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction }from '@reduxjs/toolkit';

interface LinksState {
  list: Link[] | null;
}

const initialState: LinksState = {
  list: null,
};

export const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Link[]>) => {
      state.list = action.payload;
    },
    addLink: (state, action: PayloadAction<Link>) => {
      if (state.list) {
        state.list = state.list.concat(action.payload);
      }
    },
    updateLink: (state, action: PayloadAction<{ index: number, link: Link}>) => {
      if (state.list) {
        Object.assign(state.list[action.payload.index], action.payload.link);
      }
    }
  }
});

export const { setList, addLink, updateLink } = linksSlice.actions;

export default linksSlice.reducer;