import { registerFormSchema } from "@/app/validations/auth/registerFormSchema";
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { userBusinessRules } from "@/lib/rules/userBusinessRules";
import { NextRequest, NextResponse } from "next/server";

// Wrapper => Sarmallayacı.
export const POST = withErrorHandler(async (req: NextRequest) => {
    await connectToDatabase();
    const body = await req.json();
    const result = registerFormSchema.safeParse(body);
    if(!result.success) 
    {
        return NextResponse.json(result.error.format(), {status:400})
    }

    // Email adresi benzersizlik kontrolü
    await userBusinessRules.checkEmailUniqueness(result.data.email);
    

    const user = await User.create({name: result.data.name, email: result.data.email, password: result.data.password});
    return NextResponse.json(user, {status: 201, headers: {"Content-Type": "application/json"}});
})

// Global Exception Handling