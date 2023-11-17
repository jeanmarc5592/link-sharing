import React from 'react'

const LinksListSkeleton = () => {
  return (
    <>
      <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6 animate-pulse">
        <div className="w-[20%] h-6 bg-custom-gray-lighter mb-8" />

        <div className="w-[10%] h-4 bg-custom-gray-lighter mb-2" />
        <div className="w-full h-12 bg-custom-gray-lighter mb-4" />
        
        <div className="w-[10%] h-4 bg-custom-gray-lighter mb-2" />
        <div className="w-full h-12 bg-custom-gray-lighter mb-4" />
      </div>

      <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6 animate-pulse">
        <div className="w-[20%] h-6 bg-custom-gray-lighter mb-8" />

        <div className="w-[10%] h-4 bg-custom-gray-lighter mb-2" />
        <div className="w-full h-12 bg-custom-gray-lighter mb-4" />
        
        <div className="w-[10%] h-4 bg-custom-gray-lighter mb-2" />
        <div className="w-full h-12 bg-custom-gray-lighter mb-4" />
      </div>
    </>
  )
}

export default LinksListSkeleton
