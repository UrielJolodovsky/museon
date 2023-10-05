import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions)
        const id = session?.user.id
        if (id === undefined) {
            return new NextResponse("", {status: 200})
        }
        const getlikes = await db.likeComment.findMany({
            where: {
                authorId: id
            },
            select: {
                commentId: true
            }
        })
    } catch(error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
}