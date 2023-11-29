const ProfileCardSkeleton = () => {
  return (
    <div className="w-fit mx-auto mt-10 p-4 sm:p-10 sm:mt-0 sm:bg-white sm:rounded-lg sm:shadow-lg sm:absolute sm:left-1/2 sm:top-[18%] sm:-translate-x-1/2">
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-[104px] h-[104px] rounded-full mb-6 bg-custom-gray-lighter" />

        <div className="h-10 w-[250px] bg-custom-gray-lighter mb-2" />
        <div className="h-6 w-[150px] bg-custom-gray-lighter mb-10" />

        <div className="h-[60px] mb-6 rounded-md w-full bg-custom-gray-lighter" />
        <div className="h-[60px] mb-6 rounded-md w-full bg-custom-gray-lighter" />
        <div className="h-[60px] rounded-md w-full bg-custom-gray-lighter" />
      </div>
    </div>
  )
}

export default ProfileCardSkeleton
