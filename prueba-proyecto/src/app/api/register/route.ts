import { db } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { emailPayload, transporter } from "@/lib/config/nodemailer";



export async function POST(req: Request, res: Response) {
    try {
    const { email, name, password } = await req.json();
    if (email.length === 0 || name.length === 0 || password.length === 0) {
        return new NextResponse("Missing fields", { status: 400 });
    }
    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    })
    if (existingUser) {
        return new NextResponse("Email already in use", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    
    const user = await db.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword,
        }
    })

    console.log(user)
    const token = jwt.sign({
        expiresIn: '15m',
        user: {
            name: name,
            email: email,
        },
    }, process.env.JWT_SECRET!)


    const decodeToken = jwt.decode(token)
    console.log(decodeToken)
    const refreshToken = jwt.sign({
        expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        user: {
            name: name,
            email: email,
        }
    }, process.env.JWT_SECRET!)

    console.log(token)
    console.log(refreshToken)
    
    const access_token = await db.verificationToken.create({
        data: {
            identifier: token,
            token: refreshToken,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        }
    }) 


    const info = await transporter.sendMail({
        ...emailPayload(email),
        subject: 'Verification email',
        text: 'Prueba',
        html: `<b>Please, click the link to verify your email</b> <a href="http://museon-proyecto.vercel.app/token/${token}">Click here</a>`,
    })


    console.log(user)
    return new NextResponse("You have already registered your account. Please verify your email", {status: 200})


    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse("Internal error", {status: 500})
    }
}