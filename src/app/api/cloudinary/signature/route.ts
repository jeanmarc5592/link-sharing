import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('"process.env.CLOUDINARY_API_SECRET" is not defined');
    return NextResponse.json('Something went wrong uploading your image.', { status: 500 });
  }

  const signature = cloudinary.utils.api_sign_request(body.paramsToSign, process.env.CLOUDINARY_API_SECRET);

  return NextResponse.json({ signature });
};