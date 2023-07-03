import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import nodemailer from "nodemailer";

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
        to: 'leoboro1234@gmail.com',
        subject: 'Prueba',
        text: 'Prueba',
        html: '<b>Prueba</b> <a href="http://localhost:3000">Go to page</a>',
    })
    return NextResponse.json(info.messageId)
}