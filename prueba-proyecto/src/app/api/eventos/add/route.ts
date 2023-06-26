import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { db } from "@/lib/db";


export async function POST(req:NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions)
        const id = session?.user.id
        if (id === undefined) {
            return new NextResponse("You are not logged in", {status: 401})
        }
        const tipo_usuario = await db.user.findUnique({
            where: {
                id: id
            },
            select: {
                tipo_usuario: true
            }
        })
        if (tipo_usuario!.toString() !== "museo") {
            return new NextResponse("You are not allowed to add an event")
        }
        const evento = await db.eventos.create({
            data: {
                content: "Hola",
                authorId: session?.user.id!,
            },
        })
    } catch (error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
}