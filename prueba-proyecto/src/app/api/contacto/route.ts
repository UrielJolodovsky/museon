import { emailPayload, transporter } from "@/lib/config/nodemailer";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    
    const { message, user, email } = await req.json()
    const session = await getServerSession(authOptions)

    if (message.length === 0) {
        return new NextResponse("El mensaje no puede estar vació", {status: 400})
    }

    else if (session?.user.name !== user || user === undefined) {
        return new NextResponse("Aún no estás loggeado", {status:400})
    }

    const info = await transporter.sendMail({
        ...emailPayload('museon.proyecto@gmail.com'),
        subject: 'Contacto de usuario',
        text: 'Prueba',
        html: `<h1>Message from: ${user}</h1> <h2>Email: ${email} </h2> <h3>Content: ${message} </h3>`
    })

    return new NextResponse("Mensaje enviado con éxito!", {status: 200})
}