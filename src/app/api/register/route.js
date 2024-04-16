import User from "@/models/user";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request, response) => {
  const { name, email, password, contact, country } = await request.json();
  await connect();

  const existingUser = await User.findOne({ email });
  console.log(existingUser)

  if (existingUser) {
    return new NextResponse("Already exist !", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    name,
    email,
    contact, 
    password:hashedPassword,
    country
  });

  try {
    console.log(newUser)
    await newUser.save();
    return new NextResponse(JSON.stringify({message:"User is registered"}), { status: 200 });
  } catch (err) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
