import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store/store';

interface HomeTabsState {};

const initialState: HomeTabsState = {};

export const homeTabsSlice = createSlice({
  name: 'homeTabs',
  initialState,
  reducers: {}
});

export default homeTabsSlice.reducer;