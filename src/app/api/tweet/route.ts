import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export const POST = async (req: NextRequest) => {
  const { title, description, userId } = await req.json();
  if (!title || !description || !userId) {
    return NextResponse.json({ message: "Insufficient Data" }, { status: 404 });
  }
  //   Check if user is already present
  try {
    await prisma.$connect();
    const newTweet = await prisma.tweet.create({
      data: {
        tweetTitle: title,
        tweetDescription: description,
        userId,
      },
    });
    // updating the tweets in user array
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { tweets: { connect: { id: newTweet.id } } },
    });
    console.log(`newTweet is `, newTweet);
    console.log(`updatedUser is `, updatedUser);
    if (!newTweet) {
      return NextResponse.json(
        { message: "Unable to create tweet" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Tweet created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
