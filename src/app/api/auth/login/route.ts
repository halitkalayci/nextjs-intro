import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";

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


    return new Response(JSON.stringify({message: "Login successful"}), {status: 200, headers: {"Content-Type": "application/json"}});
}

