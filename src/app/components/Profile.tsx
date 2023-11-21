import React from 'react'
import Typography from '../common/components/Typography'
import ProfilePicture from './ProfilePicture'
import ProfileInfo from './ProfileInfo'
import Button from '../common/components/Button'

const Profile = () => {
  const handleSave = () => {
    // TODO: Implement save logic
  }

  return (
    <div className="flex flex-col h-full">
      <Typography variant="Heading M" className="mb-4">Profile Details</Typography>
      <Typography className="mb-12">Add your details to create a personal touch to your profile.</Typography>

      <ProfilePicture />
      <ProfileInfo />

      <div className="border-t pt-4 pr-6 -mx-6 mt-auto flex justify-end">
        <div className="w-fit">
          <Button 
            disabled={false} 
            onClick={handleSave}
            isLoading={false}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
