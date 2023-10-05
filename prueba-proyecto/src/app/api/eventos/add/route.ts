import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { content, description } = await req.json()
        const session = await getServerSession(authOptions)
        const id = session?.user.id
        // if (id === undefined) {
        //     return new NextResponse("You are not logged in", { status: 401 })
        // }
        // const tipo_usuario = await db.user.findUnique({
        //     where: {
        //         id: id
        //     },
        //     select: {
        //         tipo_usuario: true
        //     }
        // })
        // if (tipo_usuario!["tipo_usuario"] !== "museo") {
        //     return new NextResponse("You are not allowed to add an event", { status: 401 })
        // }
        if (content === undefined || content === "" || content.length === 0) {
            return new NextResponse("El texto no puede estar vacío", { status: 400 })
        }
        const evento = await db.eventos.create({
            data: {
                content: content,
                description: description,
                authorId: session?.user.id!,
                // fecha: new Date()
            },
        })
        return new NextResponse(evento["id"], { status: 200 })
    } catch (error) {
        return new NextResponse("Ha ocurrido un error", { status: 400 })
    }
}