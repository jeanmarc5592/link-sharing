import homeTabsReducer from './slices/homeTabsSlice'
import linksReducer from './slices/linksSlice'
import profileReducer from'./slices/profileSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    homeTabs: homeTabsReducer,
    links: linksReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch