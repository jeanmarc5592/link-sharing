"use client" 

import LinkButton from '../common/components/LinkButton';
import PhoneMockup from '../common/components/icons/PhoneMockup'
import { useAppSelector } from '../common/hooks/useAppSelector'

const PhonePreview = () => {
  const links = useAppSelector((state) => state.links.list);

  return (
    <div className="relative">
      <PhoneMockup />

      <div className="w-[80%] absolute left-1/2 top-[50%] -translate-x-1/2">
        {links?.slice(0, 3).map((link) => {
          return <LinkButton key={link.id} link={link} />
        })}
      </div>
    </div>
  )
}

export default PhonePreview
