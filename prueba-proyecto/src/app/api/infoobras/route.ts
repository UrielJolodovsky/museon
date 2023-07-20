import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const { id } = await req.json()

    const info = await db.infoObras.findFirst({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            description: true,

        }
    })
    if (!info) {
        return new NextResponse("This info does not exist", {status: 400})
    }
    return NextResponse.json(info, {status: 200})
}