import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../lib/db'

export async function POST(req: NextRequest, res: NextResponse) {
    try {
    const { message, museoId } = await req.json()
    const session = await getServerSession()
    if (session?.user.id === undefined) {
        return new NextResponse("You are not logged in", {status: 401})
    }
    if (message === undefined || message.length === 0) {
        return new NextResponse("Message is empty", {status: 400})
    }
    const addmessages = await db.comments.create({
        data: {
            museumId: museoId,
            content: message,
            authorId: session.user.id
        }
    })
    return new NextResponse("Message added succesfully", {status: 200})
    } catch(error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
}