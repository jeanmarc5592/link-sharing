import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HomeTabsState {
  activeTab: string;
};

const initialState: HomeTabsState = {
  activeTab: "links",
};

export const homeTabsSlice = createSlice({
  name: 'homeTabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      if (action.payload !== state.activeTab) {
        state.activeTab = action.payload;
      }
    }
  }
});

export const { setActiveTab } = homeTabsSlice.actions;

export default homeTabsSlice.reducer;