import { NextRequest, NextResponse } from "next/server";
import { Secret, sign } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import jwt from 'jsonwebtoken'


const token = jwt.sign({
        expiresIn: '15m',
        user: {
            name: 'Uriel',
            email: 'urieljolo@gmailcom',
        },
}, process.env.JWT_SECRET!)
const decodedToken = jwt.decode(token)
const refreshToken = jwt.sign({
    expiresIn: Math.floor(Date.now() / 1000) * 60 * 60 * 24 * 30,
    user: {
        name: 'Uriel',
        email: 'urieljolo@gmail.com'
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
export async function GET(req: NextRequest, res: NextResponse) {
    const info = await transporter.sendMail({
        from: 'museon.proyecto@gmail.com',
        to: 'urieljolo@gmail.com',
        subject: 'Ganador del sorteo de una PS5',
        text: 'Prueba',
        html: '<b>Felicidades, has ganado una PS5</b> <a href="http://museon-proyecto.vercel.app">Ir a la página para reclamarla</a>',
    })
    return NextResponse.json(info.messageId)
}