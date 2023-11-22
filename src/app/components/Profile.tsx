import React, { useEffect } from 'react'
import Typography from '../common/components/Typography'
import ProfilePicture from './ProfilePicture'
import ProfileInfo from './ProfileInfo'
import Button from '../common/components/Button'
import { useQuery } from '@tanstack/react-query'
import { getMe } from '../services/users'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { setProfile } from '@/lib/store/slices/profileSlice'

const Profile = () => {
  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getMeQuery.data) {
      return;
    }

    dispatch(setProfile(getMeQuery.data));
  }, [getMeQuery.data, dispatch]);

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
