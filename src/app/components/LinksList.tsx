"use client"

import Typography from "../common/components/Typography"
import EmptyLinksIcon from "../common/components/icons/EmptyLinksIcon"
import SingleLink from "./SingleLink"
import { Link } from "@prisma/client"

interface LinksListProps {
  links?: Link[];
}

const LinksList: React.FC<LinksListProps> = ({ links }) => {
  return (
    <div className="w-full bg-custom-gray-light rounded-md p-10 mb-6 flex flex-col justify-center items-center">
      {(links && links.length === 0) && (
        <>
          <EmptyLinksIcon />
          <Typography variant="Heading M" className="mt-10 mb-5">Let&apos;s get you started</Typography>
          <Typography className="text-center max-w-lg">
            Use the &quot;Add new link&quot; button to get started. Once you have more than one link,you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
          </Typography>
        </>
      )}
      
      {links && links.length > 0 && links.map((link) => {
        return (
          <SingleLink key={link.id} />
        )
      })}
    </div>
  )
}

export default LinksList
