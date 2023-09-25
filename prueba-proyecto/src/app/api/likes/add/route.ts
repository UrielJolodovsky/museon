import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'
import { db } from '@/lib/db'

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const { id_comment } = await req.json()
        const session = await getServerSession(authOptions)
        const id = session?.user.id

        if (id === undefined) {
            return new NextResponse("You are not logged in", { status: 401 })
        }

        const like = await db.likeComment.findFirst({
            where: {
                commentId: id_comment,
                authorId: id
            }
        })
        if (!like) {
            const newLike = await db.likeComment.create({
                data: {
                    commentId: id_comment,
                    authorId: id
                }
            })
            return NextResponse.json("Like added succesfully", { status: 200 })
        }
        else {
            const deleteLike = await db.likeComment.delete({
                where: {
                    id: like.id
                }
            })
            return NextResponse.json("Like deleted successfully", { status: 200 })
        }
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 400 })
    }
}