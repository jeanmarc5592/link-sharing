"use client"

import Typography from '../common/components/Typography'
import Button from '../common/components/Button'
import LinksList from './LinksList'
import { useQuery } from '@tanstack/react-query'
import { getLinks } from '../services/links'

const Links = () => {
  const { error, data, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
    enabled: true,
  });

  const addNewLink = () => {
    // TODO: Implement adding logic
  };

  const handleSave = () => {
    // TODO: Implement save logic
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

      <LinksList links={data} />

      <div className="border-t pt-4 pr-6 -mx-6 mt-auto flex justify-end">
        <div className="w-fit">
          <Button 
            disabled={!data || data.length === 0} 
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
