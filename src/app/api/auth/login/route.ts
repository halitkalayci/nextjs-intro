import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req:Request)
{
    await connectToDatabase();
    const {email,password} = await req.json();

    if(!email || !password)
       return new Response(JSON.stringify({message: "Missing required fields"}), {status: 400, headers: {"Content-Type": "application/json"}});
    const user = await User.findOne({email})

    if(!user)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});


    // KUllanıcı giriş yaptı, jwt oluştur.
    const token = jwt.sign(
      { email, name:user.name },
      JWT_SECRET,
      { expiresIn: '10m', algorithm:"HS512" }
    )

    const cookie = await cookies();
    cookie.set(
      {
         name:"token",
         value: token,
         httpOnly:true,
         maxAge:  7 * 24 * 60 * 60,
         path: '/',
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax' // strict,lax,none => 
      }
    );

    return NextResponse.json({message:"Login successfull", token}, {status:200});
}

