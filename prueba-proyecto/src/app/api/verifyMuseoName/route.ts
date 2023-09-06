import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try{
        
        const { name_museo } = await req.json()
        const isUrl = await db.museos.findFirst({
            where: {
                name: name_museo
            }
        })
        if (isUrl === null) {
            return false
        }
        return true 
    } catch (error) {
        return new NextResponse("Something went wrong", {status: 400})
    }

}