"use client"

import Typography from "../common/components/Typography"
import EmptyLinksIcon from "../common/components/icons/EmptyLinksIcon"
import { useAppSelector } from "../common/hooks/useAppSelector"
import SingleLink from "./SingleLink"

const LinksList = () => {
  const { list: links } = useAppSelector((state) => state.links);

  return (
    <div className="max-h-[35vh] overflow-auto sm:max-h-[50vh]">
      {(links && links.length === 0) && (
        <div className="flex flex-col justify-center items-center w-full bg-custom-gray-light rounded-md p-6 mb-6">
          <EmptyLinksIcon />
          <Typography variant="Heading M" className="mt-10 mb-5">Let&apos;s get you started</Typography>
          <Typography className="text-center max-w-lg">
            Use the &quot;Add new link&quot; button to get started. Once you have more than one link,you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
          </Typography>
        </div>
      )}
      
      {links && links.length > 0 && links.map((link, index) => {
        return (
          <SingleLink key={link.id} linkData={link} index={index} />
        )
      })}
    </div>
  )
}

export default LinksList
