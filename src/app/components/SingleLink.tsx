"use client"

import { Link } from "@prisma/client"
import Typography from "../common/components/Typography"
import Input from "../common/components/Input";
import Dropdown from "../common/components/Dropdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchemaType, linkSchema } from "@/lib/validators/link";
import LinkIcon from "../common/components/icons/LinkIcon";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { updateLink } from "@/lib/store/slices/linksSlice";
import { PlatformObject, PLATFORMS } from '../../lib/constants/platforms';
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteLink, getLinkAnalytics, getLinks } from "../services/links";
import { toast } from "react-toastify";
import DragAndDropIcon from "../common/components/icons/DragAndDropIcon";
import Modal from "../common/components/Modal";
import Button from "../common/components/Button";
import { useAppSelector } from "../common/hooks/useAppSelector";
import LoadingSpinner from "../common/components/LoadingSpinner";
import { getMe } from "../services/users";
import { getMessage } from "@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware";

interface SingleLinkProps {
  linkData: Link;
  index: number;
}

const SingleLink: React.FC<SingleLinkProps> = ({ index, linkData }) => {
  const { showRemoveLinkModal } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(!showRemoveLinkModal);

  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });
  
  const deleteLinkMutation = useMutation({
    mutationKey: ['links'],
    mutationFn: (linkId: string) => {
      return deleteLink(linkId, !dontAskAgain);
    },
  });

  const getMeQuery = useQuery({
    queryKey: ['users'],
    queryFn: getMe
  });

  const getLinkAnalyticsQuery = useQuery({
    queryKey: ["linkAnalytics"],
    queryFn: getLinkAnalytics,
  });
  
  const methods = useForm<LinkSchemaType>({
    resolver: zodResolver(linkSchema),
  });

  const { href } = linkData;

  const handleRemove = async () => {
    try {
      await deleteLinkMutation.mutateAsync(linkData.id);
      getLinksQuery.refetch();
      getMeQuery.refetch();
      getLinkAnalyticsQuery.refetch();
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong deleting your link. Please try again.');
    }
  };

  const updateHref = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLink({ link: { ...linkData, href: e.target.value }, index }))
  };

  const updatePlatform = (platformObject: PlatformObject) => {
    dispatch(updateLink({ link: { ...linkData, platform: platformObject.id }, index }));
  };

  const handleDontAskAgain = (e: ChangeEvent<HTMLInputElement>) => {
    setDontAskAgain(e.target.checked);
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6">
      <FormProvider {...methods}>
        <div className="w-full flex justify-between mb-4">
          <span className="flex items-center">
            <DragAndDropIcon />
            <Typography className="font-semibold ml-2">Link #{index + 1}</Typography>
          </span>

          {showRemoveLinkModal ? (
            <button 
              onClick={openModal} 
              className="text-custom-gray hover:text-custom-purple transition-all"
            >
              Remove
            </button>
          ) : (
            <button 
              onClick={handleRemove} 
              className="text-custom-gray hover:text-custom-purple transition-all"
            >
              {deleteLinkMutation.isLoading ? <LoadingSpinner variant="secondary" /> : "Remove"}
            </button>
          )}
        </div>

        <Dropdown
          label="Platform"
          selectedEl={{ id: linkData.platform }}
          setSelected={updatePlatform}
          data={PLATFORMS}
        />

        <Input 
          label="Link" 
          validationName="href" 
          icon={<LinkIcon />} 
          inputProps={{ 
            value: href || "", 
            onChange: updateHref,
            placeholder: "e.g. https://www.github.com/johnappleseed",
          }}
        />
      </FormProvider>

      <Modal open={modalOpen && !!showRemoveLinkModal} onClose={closeModal}>
        <Typography variant="Heading S" className="mb-4">Are you sure to remove this link?</Typography>
        <Typography className="mb-6">All your analytics will also be removed and can not be restored later.</Typography>

        <div className="flex items-center justify-center">
          <input 
            id="show-remove-link-modal" 
            type="checkbox" 
            className="w-4 h-4 mr-2 text-custom-purple bg-gray-100 border-gray-300 rounded focus:ring-custom-purple" 
            checked={dontAskAgain}
            onChange={handleDontAskAgain}
          />
          <label htmlFor="show-remove-link-modal">
            <Typography>Don&apos;t ask again</Typography>
          </label>
        </div>
          
        <div className="flex w-fit mt-8 mx-auto">
          <Button 
            dense 
            onClick={closeModal}
            variant="secondary" 
            className="mr-4"
          >
            Cancel
          </Button>
          <Button 
            dense 
            onClick={handleRemove} 
            isLoading={deleteLinkMutation.isLoading}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default SingleLink