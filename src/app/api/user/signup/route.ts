import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Insufficient Data" }, { status: 404 });
  }
  //   Check if user is already present
  try {
    await prisma.$connect();
    const existedUser = await prisma.user.findFirst({ where: { email } });
    console.log(`Existed user is `, existedUser);
    if (existedUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 404 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    if (!createdUser) {
      NextResponse.json({ message: "Error creating user" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User created", createdUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
