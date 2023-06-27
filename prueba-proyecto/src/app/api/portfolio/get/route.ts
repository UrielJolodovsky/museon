import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// SE PODRÍA JUNTAR (PORTFOLIOS) USER-GET CON GET MEDIANTE EL PASE DE UN PARAMETRO

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { user_id } = await req.json()
        const getportfolios = await db.portfolios.findMany({
            select: {
                name_portfolio: true,
                id: true,
                author: {
                    select: {
                        name: true,
                        image: true,
                    }
                }          
            }
        })
        return NextResponse.json(getportfolios, {status: 200})
    } catch (error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
} 