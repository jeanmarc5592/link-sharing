import Typography from "../common/components/Typography"
import ImageIcon from "../common/components/icons/ImageIcon"

const ProfilePicture = () => {
  const handleUpload = async () => {
    // TODO: Implement upload logic
  }

  return (
    <div className="grid grid-cols-1 bg-custom-gray-light rounded-md p-6 mb-6 sm:grid-cols-3">
      <div className="flex items-center col-span-1">
        <Typography className="mb-4 sm:mb-0">Profile picture</Typography>
      </div>

      <div className="col-span-2 flex flex-col sm:flex-row">
        <div 
          onClick={handleUpload}
          className="flex flex-col justify-center items-center ml-0 mr-0 mb-4 w-[193px] h-[193px] cursor-pointer bg-custom-purple-light rounded-md sm:mb-0 sm:mr-6"
        >
          <ImageIcon />
          <Typography className="text-custom-purple font-semibold mt-2">+ Upload Image</Typography>
        </div>

        <div className="flex flex-col justify-center">
          <Typography variant="Body S">Image must be below 1024x1024px.&nbsp;</Typography>
          <Typography variant="Body S">Use PNG or JPG format.</Typography>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture
