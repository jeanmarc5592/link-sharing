import React from 'react'
import Typography from '../common/components/Typography'
import Button from '../common/components/Button'
import LinksList from './LinksList'

const Links = () => {
  const addNewLink = () => {
    // TODO: Implement adding logic
  };

  const handleSave = () => {
    // TODO: Implement save logic
  };

  return (
    <>
      <Typography variant="Heading M" className="mb-4">Customize your links</Typography>
      <Typography className="mb-12">Add/edit/remove links below and then share all your profiles with the world!</Typography>
      <Button 
        className="mb-6"
        variant="secondary" 
        onClick={addNewLink
      }>+ Add new link</Button> 

      <LinksList />

      <div className="border-t pt-4 pr-6 -mx-6 flex justify-end">
        <div className="w-fit">
          {/* TODO: Adjust "disabled" attribute (when links list is empty) */}
          <Button disabled onClick={handleSave}>Save</Button>
        </div>
      </div>
    </>
  )
}

export default Links
