import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    const prisma = new PrismaClient()
    try {
        const { name_portfolio } = await req.json()
        const session = await getServerSession()
        if (session?.user.id === undefined) {
            return new Response("You must have logged in", {status: 401})
        }
        const portfoliocreated = await prisma.portfolio.create({
            data: {
                name: name_portfolio,
                authorId: session.user.id
            }
        })
        return new Response("Portfolo added succesfully", {status: 200})
    } catch(error) {
        return new Response("Something wet wrong creating the portfolio", {status: 400})
    }
}