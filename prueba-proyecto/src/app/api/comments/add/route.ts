import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../lib/db'
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
    const { message, nameMuseo } = await req.json()
    const session = await getServerSession(authOptions)
    if (session?.user!.id === undefined) {
        return new NextResponse("Aún no estás loggeado", {status: 401})
    }
    /*if (session?.user.tipo_usuario != "museo") {
        return new NextResponse("You are not allowed to add messages", {status: 401})
    }*/
    if (message === undefined || message.length === 0) {
        return new NextResponse("El mensaje no puede estar vacío", {status: 400})
    }

    const getMuseoId = await db.museos.findFirst({
        where: {
            subname: nameMuseo
        },
        select: {
            id: true
        }
    })

    const addmessages = await db.comments.create({
        data: {
            museumId: getMuseoId!.id,
            content: message,
            authorId: session.user.id
        }
    })
    return new NextResponse("Mensaje añadido con éxito", {status: 200})
    } catch(error) {
        return new NextResponse("Ha ocurrido un error", {status: 400})
    }
}