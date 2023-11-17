"use client"

import Typography from '../common/components/Typography'
import Button from '../common/components/Button'
import LinksList from './LinksList'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addLink, editLinks, getLinks } from '../services/links'
import { useEffect } from 'react'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { ModifiedLink, setList } from '@/lib/store/slices/linksSlice'
import { toast } from 'react-toastify'
import { useAppSelector } from '../common/hooks/useAppSelector'

const Links = () => {
  const { data, refetch } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });

  const addNewLinkMutation = useMutation({
    mutationKey: ['links'],
    mutationFn: addLink,
  });

  const editLinksMutation = useMutation({
    mutationKey: ['links'],
    mutationFn: (links: ModifiedLink[]) => {
      return editLinks(links);
    }
  });

  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links.list);

  const modifiedLinks = links?.filter((link) => link.isModified);

  useEffect(() => {
    if (!data) {
      return;
    }

    dispatch(setList(data));
  }, [data, dispatch])

  const addNewLink = async () => {
    try {
      await addNewLinkMutation.mutateAsync();
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong adding a new link. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      if (!modifiedLinks) {
        return;
      }

      await editLinksMutation.mutateAsync(modifiedLinks);
      refetch();

      toast.success('Your links have been saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Something went editing your link(s). Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Typography variant="Heading M" className="mb-4">Customize your links</Typography>
      <Typography className="mb-12">Add/edit/remove links below and then share all your profiles with the world!</Typography>
      <Button 
        className="mb-6"
        variant="secondary" 
        onClick={addNewLink}
      >
        + Add new link
      </Button> 

      <LinksList />

      <div className="border-t pt-4 pr-6 -mx-6 mt-auto flex justify-end">
        <div className="w-fit">
          <Button 
            disabled={!data || data.length === 0 || !modifiedLinks || modifiedLinks.length === 0} 
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Links
