import { AnalyticsData } from "@/app/components/types";
import { Platform } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

const DATA: AnalyticsData[] = [
  {
    linkName: Platform.GITHUB,
    analytics: [
      {
        date: "Dec 5th",
        clicks: "56"
      },
      {
        date: "Dec 6th",
        clicks: "38"
      },
      {
        date: "Dec 7th",
        clicks: "25"
      },
      {
        date: "Dec 8th",
        clicks: "73"
      },
      {
        date: "Dec 9th",
        clicks: "46"
      },
      {
        date: "Dec 10th",
        clicks: "50"
      },
      {
        date: "Dec 11th",
        clicks: "32"
      },
    ]
  },
  {
    linkName: Platform.HASHNODE,
    analytics: [
      {
        date: "Dec 5th",
        clicks: "99"
      },
      {
        date: "Dec 6th",
        clicks: "74"
      },
      {
        date: "Dec 7th",
        clicks: "88"
      },
      {
        date: "Dec 8th",
        clicks: "64"
      },
      {
        date: "Dec 9th",
        clicks: "70"
      },
      {
        date: "Dec 10th",
        clicks: "56"
      },
      {
        date: "Dec 11th",
        clicks: "92"
      },
    ]
  }
];

interface AnalyticsState {
  data: AnalyticsData[];
}

const initialState: AnalyticsState = {
  data: DATA,
};

export const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {}
});

export default analyticsSlice.reducer;