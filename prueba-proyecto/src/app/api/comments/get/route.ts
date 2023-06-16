import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient()
    try {
    const { museoId } = await req.json()
    const session = await getServerSession()
    if (session?.user.id === undefined) {
        return new Response("You are not logged in", {status: 401})
    }
    const getmessages = await prisma.comments.findMany({
        where: {
            museoId: museoId!
        }
    })
    return new Response(getmessages, {status: 200})
    } catch(error) {
        return new Response("Something went wrong", {status: 400})
    }
}