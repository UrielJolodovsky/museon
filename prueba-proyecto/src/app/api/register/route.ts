import { db } from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'



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
            hashedPassword: hashedPassword
        }
    })

    const token = jwt.sign({
        expiresIn: '15m',
        user: {
            name: name,
            email: email,
        },
    }, process.env.JWT_SECRET!)
    
    const decodedToken = jwt.decode(token)
    
    const refreshToken = jwt.sign({
        expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
        user: {
            name: name,
            email: email,
        }
    }, process.env.JWT_SECRET!)
    
    const access_token = db.verificationToken.create({
        data: {
            identifier: decodedToken?.toString()!,
            token: refreshToken,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        }
    }) 
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email_user as string,
            pass: process.env.email_password as string
        }
    })

    const info = await transporter.sendMail({
        from: 'museon.proyecto@gmail.com',
        to: email,
        subject: 'Verification email',
        text: 'Prueba',
        html: '<b>Please, click the link to verify your email</b> <a href=`http://localhost:3000/token/${token}`>Click here</a>',
    })


    console.log(user)
    return new NextResponse("You have already registered your account. Please verify your email", {status: 200})


    } catch(error: any) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse("Internal error", {status: 500})
    }
}