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
        to: 'urieljolo@gmail.com',
        subject: 'Ganador del sorteo de una PS5',
        text: 'Prueba',
        html: '<b>Felicidades, has ganado una PS5</b> <a href="http://museon-proyecto.vercel.app">Ir a la página para reclamarla</a>',
    })
    return NextResponse.json(info.messageId)
}