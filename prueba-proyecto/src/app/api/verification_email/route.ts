import { NextRequest, NextResponse } from "next/server";
import { Secret, sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest, res: NextResponse) {
    const { token } = await req.json()

    const verification_decodeToken = await db.verificationToken.findUnique({
        where: {
            identifier: token
        },
        select: {
            identifier: true,
        }
    })
    const decodeToken = jwt.decode(verification_decodeToken) as jwt.JwtPayload
    const email_user = decodeToken.user.email

    const verification_emailUpdated = await db.user.update({
        where: {
            email: email_user
        },
        data: {
            emailVerified: true
        }
    })

    return new NextResponse("Your email is now verified", {status: 200})
}