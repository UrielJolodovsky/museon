import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../../lib/db'
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
    const { parametros } = await req.json()

    //console.log(parametros)
    // const session = await getServerSession(authOptions)
    // console.log(session?.user)
    // const session = await getServerSession()
    // if (session?.user.id === undefined) {
    //     return new NextResponse("You are not logged in", {status: 401})
    // }
    
    const getmessages = await db.comments.findMany({
        where: {
            museos: {
                subname: parametros
            }
            },
            select: {
                author: {
                    select: {
                        name: true,
                        image: true
                    }
                },
                content: true,
                createdAt: true
            }
  
    })
   // console.log(getmessages)
    return NextResponse.json(getmessages, {status: 200})
    } catch(error) {
        return new NextResponse("Something went wrong", {status: 400})
    }
}