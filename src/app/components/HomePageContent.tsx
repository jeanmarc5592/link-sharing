"use client"

import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks/useAppSelector"
import { getLinks } from "../services/links";
import Links from "./Links";
import Preview from "./PhonePreview";
import Profile from "./Profile";
import { useEffect } from "react";
import { setList } from "@/lib/store/slices/linksSlice";
import { getMe } from "../services/users";
import { setProfile } from "@/lib/store/slices/profileSlice";
import Analytics from "./Analytics";

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
