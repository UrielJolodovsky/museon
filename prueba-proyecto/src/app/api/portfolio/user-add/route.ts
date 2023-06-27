import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    try {
        const { name_portfolio } = await req.json()
        const session = await getServerSession()
        if (session?.user.id === undefined) {
            return new NextResponse("You must have logged in", {status: 401})
        }
        if (name_portfolio === undefined || name_portfolio === '' || name_portfolio.length === 0) {
            return new NextResponse("The input for the name of the portfolio can't be empty", {status: 400})
        }
        const portfoliocreated = await db.portfolios.create({
            data: {
                name_portfolio: name_portfolio,
                authorId: session?.user.id
            }
        })
        return new NextResponse("Portfolo added succesfully", {status: 200})
    } catch(error) {
        return new NextResponse("Something wet wrong creating the portfolio", {status: 400})
    }
}