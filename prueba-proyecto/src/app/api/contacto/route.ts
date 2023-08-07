import { emailPayload, transporter } from "@/lib/config/nodemailer";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    
    const { message, user, email } = await req.json()
    const session = await getServerSession(authOptions)

    if (message.length === 0) {
        return new NextResponse("Your message is empty", {status: 400})
    }

    else if (session?.user.name !== user || user === undefined) {
        return new NextResponse("You are probably not logged in", {status:400})
    }

    const info = await transporter.sendMail({
        ...emailPayload('museon.proyecto@gmail.com'),
        subject: 'Contacto de usuario',
        text: 'Prueba',
        html: `<h1>Message from: ${user}</h1> <h2>Email: ${email} </h2> <h3>Content: ${message} </h3>`
    })

    return new NextResponse("Message sent successfully", {status: 200})
}