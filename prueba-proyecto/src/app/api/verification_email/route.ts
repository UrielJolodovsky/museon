import { NextRequest, NextResponse } from "next/server";
import { Secret, sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest, res: NextResponse) {
    const { token } = await req.json()
    const decodeToken = jwt.decode(token)

    const verification_decodeToken = await db.verificationToken.findUnique({
        where: {
            identifier: decodeToken?.toString()
        },
        select: {
            token: true,
        }
    })

    const email_user = token['user']['email']

    const verification_emailUpdated = await db.user.update({
        where: {
            email: email_user
        },
        data: {
            emailVerified: email_user
        }
    })
}