import { db } from "@/lib/db";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const getEventos = await db.eventos.findMany({
            select: {
                content: true,
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
        return new NextResponse("Something went wrong", {status: 400})
    }
}