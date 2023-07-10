
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
    const { username_email } = await req.json()

    if (username_email === '') {
        return ''
    }

    const tipo_usuario = await db.user.findUnique({
        where: {
            email: username_email,
        },
        select: {
            tipo_usuario: true,
        }
    })
    return tipo_usuario!['tipo_usuario']
}