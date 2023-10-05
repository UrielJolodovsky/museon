import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest, res: NextResponse) {
    const { token } = await req.json()

    console.log(token)

    const verification_token = await db.verificationToken.findFirst({
        where: {
            identifier: token
        },
        select: {
            identifier: true,
        }
    })
    if (!verification_token) {
        return new NextResponse("No se ha podido verificar el mail!", {status: 400})
    }
    const decodeToken = jwt.decode(verification_token?.identifier!) as jwt.JwtPayload
    console.log(decodeToken)
    const email_user = decodeToken.user.email
    console.log(email_user)
    const verification_emailUpdated = await db.user.update({
        where: {
            email: email_user
        },
        data: {
            emailVerified: true,
        }
    })

    return new NextResponse("Tu mail ya está verificado!", {status: 200})
}