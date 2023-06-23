import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../lib/db'


export async function GET(req: NextRequest, res: NextResponse) {
    try {
    const { museoId } = await req.json()
    // const session = await getServerSession()
    // if (session?.user.id === undefined) {
    //     return new NextResponse("You are not logged in", {status: 401})
    // }
    const getmessages = await db.comments.findMany({
        where: {
            museumId: museoId
        }
    })
    return NextResponse.json(getmessages, {status: 200})
    } catch(error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
}