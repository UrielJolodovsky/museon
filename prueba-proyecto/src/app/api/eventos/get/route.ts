import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const getEventos = await db.eventos.findMany({
            select: {
                id: true,
                createdAt: true,
                content: true,
                description: true,
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                }
            }
        })
        return NextResponse.json(getEventos, {status: 200})
    } catch(error) {
        return new NextResponse("Ha ocurrido un error", {status: 400})
    }
}