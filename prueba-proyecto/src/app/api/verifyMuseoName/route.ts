import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const { name_museo } = await req.json()
        const isUrl = await db.museos.findFirst({
            where: {
                subname: name_museo
            }
        })
        if (isUrl === null) {
            return NextResponse.json(false, {status: 200})
        }
        return NextResponse.json(true, {status: 200})
    } catch (error) {
        return new NextResponse("Something went wrong", {status: 400})
    }

}