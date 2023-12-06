"use client"

import { Link } from "@prisma/client"
import Typography from "../common/components/Typography"
import Input from "../common/components/Input";
import Dropdown from "../common/components/Dropdown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchemaType, linkSchema } from "@/lib/validators/link";
import LinkIcon from "../common/components/icons/LinkIcon";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { updateLink } from "@/lib/store/slices/linksSlice";
import { PlatformObject, PLATFORMS } from '../../lib/constants/platforms';
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteLink, getLinks } from "../services/links";
import { toast } from "react-toastify";
import LoadingSpinner from "../common/components/LoadingSpinner";
import DragAndDropIcon from "../common/components/icons/DragAndDropIcon";

interface SingleLinkProps {
  linkData: Link;
  index: number;
}

const SingleLink: React.FC<SingleLinkProps> = ({ index, linkData }) => {
  const getLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  });
  
  const deleteLinkMutation = useMutation({
    mutationKey: ['links'],
    mutationFn: (linkId: string) => {
      return deleteLink(linkId);
    }
  });

  const dispatch = useAppDispatch();
  
  const methods = useForm<LinkSchemaType>({
    resolver: zodResolver(linkSchema),
  });

  const { href } = linkData;

  const handleRemove = async () => {
    try {
      await deleteLinkMutation.mutateAsync(linkData.id);
      getLinksQuery.refetch();
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

  return (
    <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6">
      <FormProvider {...methods}>
        <div className="w-full flex justify-between mb-4">
          <span className="flex items-center">
            <DragAndDropIcon />
            <Typography className="font-semibold ml-2">Link #{index + 1}</Typography>
          </span>
          <button 
            onClick={handleRemove} 
            className="text-custom-gray hover:text-custom-purple transition-all"
            >
              {deleteLinkMutation.isLoading ? <LoadingSpinner variant="secondary" /> : "Remove"}
          </button>
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
    </div>
  )
}

export default SingleLink
