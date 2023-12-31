"use client"

import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector"
import { getLinkAnalytics, getLinks } from "../services/links";
import Links from "./Links";
import Preview from "./PhonePreview";
import Profile from "./Profile";
import { useEffect } from "react";
import { setList } from "@/lib/store/slices/linksSlice";
import { getMe } from "../services/users";
import { setProfile } from "@/lib/store/slices/profileSlice";
import Analytics from "./Analytics";
import { setAnalyticsData } from "@/lib/store/slices/analyticsSlice";

const HomePageContent = () => {
  const activeTab = useAppSelector((state) => state.homeTabs.activeTab);
  const dispatch = useAppDispatch();

  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const getLinkAnalyticsQuery = useQuery({
    queryKey: ["linkAnalytics"],
    queryFn: getLinkAnalytics,
  });

  useEffect(() => {
    if (!getLinksQuery.data) {
      return;
    }

    dispatch(setList(getLinksQuery.data));
  }, [getLinksQuery.data, dispatch]);

  useEffect(() => {
    if (!getMeQuery.data) {
      return;
    }

    dispatch(setProfile(getMeQuery.data));
  }, [getMeQuery.data, dispatch]);

  useEffect(() => {
    if (!getLinkAnalyticsQuery.data) {
      return;
    }

    dispatch(setAnalyticsData(getLinkAnalyticsQuery.data));
  }, [getLinkAnalyticsQuery.data, dispatch]);

  return (
    <div className="flex w-full px-4">
      {(activeTab === "links" || activeTab === "profile") && (
        <>
          <div className="bg-white rounded-md w-1/3 mr-4 p-6 hidden lg:flex justify-center items-center">
            <Preview />
          </div>
      
          <div className="bg-white rounded-md w-full lg:w-2/3 p-6">
            {activeTab === "links" && <Links />}
            {activeTab === "profile" && <Profile />}
          </div>
        </>
      )}

      {activeTab === "analytics" && (
        <div className="bg-white rounded-md p-6 w-full">
          <Analytics />
        </div>
      )}
    </div>
  )
}

export default HomePageContent
