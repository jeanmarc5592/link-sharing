"use client"

import Typography from "../common/components/Typography"
import EmptyLinksIcon from "../common/components/icons/EmptyLinksIcon"
import { useQuery } from "@tanstack/react-query"
import { getLinks } from "../services/links"
import LoadingSpinner from "../common/components/LoadingSpinner"

const LinksList = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
    enabled: true,
  });

  return (
    <div className="w-full bg-custom-gray-light rounded-md p-10 mb-6 flex flex-col justify-center items-center">
      {isLoading && <LoadingSpinner />}

      {(data && data.length === 0) && (
        <>
          <EmptyLinksIcon />
          <Typography variant="Heading M" className="mt-10 mb-5">Let&apos;s get you started</Typography>
          <Typography className="text-center max-w-lg">
            Use the &quot;Add new link&quot; button to get started. Once you have more than one link,you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
          </Typography>
        </>
      )}
      
      {data && data.length > 0 && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default LinksList
