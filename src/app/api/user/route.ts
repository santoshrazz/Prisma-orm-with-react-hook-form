import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const GET = async (req: NextRequest) => {
  try {
    prisma.$connect();
    const allUsers = await prisma.user.findMany({
      include: { tweets: true, _count: true },
    });
    return NextResponse.json(
      { allUsers, message: "All user" },
      {
        status: 200,
      }
    );
  } catch (error) {}
};
