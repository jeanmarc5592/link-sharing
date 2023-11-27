import React from 'react'

const ProfileInfoSkeleton = () => {
  return (
    <>
      <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6 animate-pulse grid grid-cols-1 sm:grid-cols-3">
        <div className="flex items-center col-span-1 mb-4">
          <div className="col-span-1 w-[50%] h-5 bg-custom-gray-lighter" />
        </div>
        <div className="flex items-center col-span-2 mb-4">
          <div className="w-full h-12 bg-custom-gray-lighter rounded-md" />
        </div>

        <div className="flex items-center col-span-1 mb-4">
          <div className="col-span-1 w-[50%] h-5 bg-custom-gray-lighter" />
        </div>
        <div className="flex items-center col-span-2 mb-4">
          <div className="w-full h-12 bg-custom-gray-lighter rounded-md" />
        </div>

        <div className="flex items-center col-span-1 mb-4">
          <div className="col-span-1 w-[50%] h-5 bg-custom-gray-lighter" />
        </div>
        <div className="flex items-center col-span-2 mb-4">
          <div className="w-full h-12 bg-custom-gray-lighter rounded-md" />
        </div>
      </div>
    </>
  )
}

export default ProfileInfoSkeleton
