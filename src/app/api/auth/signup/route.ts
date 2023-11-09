import prisma from "@/lib/db/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // TODO: Add deserializer
    const { email, password } = (await req.json()) as {
      email: string;
      password: string;
    };

    // TODO: Validate input (Required fields are not missing, field types are correct, ...)

    // TODO: Add cryphtography utils
    const hashed_password = await hash(password, 12);

    // TODO: Add UsersService (check if email is not signed up already)
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      // TODO: Add serializer
      JSON.stringify({
        status: "error",
      }),
      { status: 500 }
    );
  }
}
