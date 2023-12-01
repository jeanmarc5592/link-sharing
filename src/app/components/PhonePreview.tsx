"use client" 

import LinkButton from '../common/components/LinkButton';
import Typography from '../common/components/Typography';
import PhoneMockup from '../common/components/icons/PhoneMockup'
import { useAppSelector } from '../common/hooks/useAppSelector'
import ProfileCardImage from '../share/components/ProfileCardImage';

const PhonePreview = () => {
  const links = useAppSelector((state) => state.links.list);
  const profile = useAppSelector((state) => state.profile);

  return (
    <div className="relative">
      <PhoneMockup />

      <div className="w-[80%] flex flex-col items-center text-center absolute left-1/2 top-[10%] -translate-x-1/2">
        <ProfileCardImage picture={profile.picture || undefined} />

        <Typography variant="Heading M" className="-mt-2">{profile.firstName} {profile.lastName}</Typography>
        <Typography className="mb-8">{profile.email}</Typography>

        {links?.slice(0, 4).map((link) => {
          return <LinkButton mode="preview" key={link.id} link={link} />
        })}
      </div>
    </div>
  )
}

export default PhonePreview
