import React, { useEffect } from 'react'
import Typography from '../common/components/Typography'
import ProfilePicture from './ProfilePicture'
import ProfileInfo from './ProfileInfo'
import Button from '../common/components/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getMe, updateMe } from '../services/users'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { setProfile } from '@/lib/store/slices/profileSlice'
import { UserUpdates } from '../services/types'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { toast } from 'react-toastify'

const Profile = () => {
  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const updateMeMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: (updates: UserUpdates) => {
      return updateMe(updates);
    }
  });

  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getMeQuery.data) {
      return;
    }

    dispatch(setProfile(getMeQuery.data));
  }, [getMeQuery.data, dispatch]);

  const handleSave = async () => {
    try {
      if (!profile.isModified) {
        return;
      }

      const { isModified, ...modifiedProfile } = profile;

      await updateMeMutation.mutateAsync(modifiedProfile);
      getMeQuery.refetch();

      toast.success('Your profile has been saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong editing your profile. Please try again.');
    }
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
            disabled={!profile.isModified} 
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
