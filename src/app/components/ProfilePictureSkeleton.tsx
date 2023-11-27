import React from 'react'

const ProfilePictureSkeleton = () => {
  return (
    <>
      <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6 animate-pulse grid grid-cols-1 sm:grid-cols-3">
        <div className="flex items-center col-span-1">
          <div className="col-span-1 w-[50%] h-5 bg-custom-gray-lighter" />
        </div>

        <div className="w-[193px] h-[193px] bg-custom-gray-lighter rounded-md col-span-2" />
      </div>
    </>
  )
}

export default ProfilePictureSkeleton
