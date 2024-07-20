import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Insufficient Data" }, { status: 404 });
  }
  //   Check if user is already present
  try {
    await prisma.$connect();
    const existedUser = await prisma.user.findFirst({ where: { email } });
    console.log(`Existed user is `, existedUser);
    if (!existedUser) {
      return NextResponse.json({ message: "No user exists" }, { status: 500 });
    }
    // Checking the password of the user
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Logged in" }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
