import { NextRequest, NextResponse } from "next/server";
import { AuthorizationError, BusinessError } from "./types/errorTypes";

export function withErrorHandler(
    handler: (req:NextRequest) => Promise<NextResponse>
) {
    return async (req:NextRequest) => {
        try {
            return await handler(req);
        }catch (error:any){
            if(error instanceof BusinessError)
                return NextResponse.json({message:error.message}, {status:400})
            else if(error instanceof AuthorizationError)
                return NextResponse.json({message:"Unauthorized"}, {status:401})

            return NextResponse.json({message:"Bilinmedik Hata"},{status:500});
        }
    }
}