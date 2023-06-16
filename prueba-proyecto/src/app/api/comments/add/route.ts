import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const prisma = new PrismaClient()
    try {
    const { message, museoId } = await req.json()
    const session = await getServerSession()
    if (session?.user.id === undefined) {
        return new Response("You are not logged in", {status: 401})
    }
    const addmessages = await prisma.comments.create({
        where: {
            museoId: museoId!,
            content: message,
            authorId: session.user.id!
        }
    })
    return new Response("Message added succesfully", {status: 200})
    } catch(error) {
        return new Response("Something went wrong", {status: 400})
    }
}