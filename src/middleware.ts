import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/register', '/api/public', '/api/auth/user']

// Tüm istekler için araya girer.

// Bu middleware'i belirli istekler için devreye alıp diğer istekler için almayacak şekilde güncelleyin. 
// Eğer istek ön yüzden geliyorsa middleware login sayfasına redirect etmeli.
export async function middleware(request:NextRequest)
{
    console.log(request.nextUrl.pathname)
    if( PUBLIC_PATHS.some( path => request.nextUrl.pathname.startsWith(path) )   )
    {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value!;

    console.log(`Token geldi: ${token}`)

    const secret = process.env.JWT_SECRET!;

    const secret_key = new TextEncoder().encode(secret);

    try {
       await jwtVerify(token, secret_key);
    }catch(err)
    {
        console.log(err);
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }


    return NextResponse.next(); // 
}

export const config = {
    matcher:['/api/:path*']
}

// composeMiddleware() -> Nextjs


export async function userMiddleware() {

}

export async function languageMiddleware() {

}
