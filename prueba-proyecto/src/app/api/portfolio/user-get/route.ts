import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { user_id } = await req.json()
        const getportfolios = await db.portfolios.findMany({
            where: {
                authorId: user_id
            },
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