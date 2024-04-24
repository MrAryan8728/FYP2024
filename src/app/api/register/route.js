
import User from "../../../models/User";
import {connect} from '../../../lib/db'
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const { name, email, password, contact, country } = await request.json();

    const isEmailExist = await User.findOne({email})
    if(isEmailExist) return NextResponse.json({Errormessage:"Email Already exists !"})

    const isContactExist = await User.findOne({contact})
    if(isContactExist) return NextResponse.json({Errormessage:"Contact already linked"})

    const hashedPassword = await bcrypt.hash(password, 5);

    const newuser = await User.create({name, email, password:hashedPassword, contact, country})

    return NextResponse.json(newuser,{
      message: "User is registered",
      status: 201
    });

  } catch (err) {
    return NextResponse.json({
      message: "POST Error (sign up)",
      status: 500,
    });
  }
};
