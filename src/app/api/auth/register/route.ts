import { registerFormSchema } from "@/app/validations/auth/registerFormSchema";
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextResponse } from "next/server";


export async function POST(req:Request)
{
    await connectToDatabase();
    const body = await req.json();
    const result = registerFormSchema.safeParse(body);
    if(!result.success) 
    {
        return NextResponse.json(result.error.format(), {status:400})
    }
    const user = await User.create({name: result.data.name, email: result.data.email, password: result.data.password});
    return new Response(JSON.stringify(user), {status: 201, headers: {"Content-Type": "application/json"}});
}