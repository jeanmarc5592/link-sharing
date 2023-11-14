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

interface SingleLinkProps {
  linkData: Link;
  index: number;
}

const SingleLink: React.FC<SingleLinkProps> = ({ index, linkData }) => {
  const dispatch = useAppDispatch();

  const { href } = linkData;
  const methods = useForm<LinkSchemaType>({
    resolver: zodResolver(linkSchema),
  });

  const { formState: { errors }} = methods;

  const handleRemove = () => {
    // TODO: Implement removing logic
  };

  const updateHref = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLink({ link: { ...linkData, href: e.target.value }, index }))
  };

  return (
    <div className="w-full bg-custom-gray-light rounded-md p-6 mb-6">
      <FormProvider {...methods}>
        <div className="w-full flex justify-between mb-4">
          <Typography className="font-semibold">Link #{index + 1}</Typography>
          <button onClick={handleRemove} className="text-custom-gray">Remove</button>
        </div>

        <Input 
          label="Link" 
          validationName="href" 
          icon={<LinkIcon />} 
          error={errors.href?.message}
          inputProps={{ 
            value: href, 
            onChange: updateHref,
            placeholder: "e.g. https://www.github.com/johnappleseed",
          }}
        />
      </FormProvider>
    </div>
  )
}

export default SingleLink