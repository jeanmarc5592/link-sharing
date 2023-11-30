"use client"

import ProfileCard from '@/app/share/components/ProfileCard'
import ProfileCardSkeleton from '@/app/share/components/ProfileCardSkeleton'
import { profile } from 'console'
import React from 'react'
import PreviewHeader from './PreviewHeader'
import { getLinks } from '@/app/services/links'
import { getMe } from '@/app/services/users'
import { useQuery } from '@tanstack/react-query'

const PreviewPageContent = () => {
  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const { data: profile } = getMeQuery;
  const { data: links } = getLinksQuery;

  return (
    <>
     <PreviewHeader />

    {getMeQuery.isLoading && getLinksQuery.isLoading ? (
      <ProfileCardSkeleton />
    ) : (
      <ProfileCard 
        firstName={profile?.firstName || undefined} 
        lastName={profile?.lastName || undefined} 
        picture={profile?.picture || undefined}
        email={profile?.email || undefined}
        links={links}
      />
    )} 
    </>
  )
}

export default PreviewPageContent
