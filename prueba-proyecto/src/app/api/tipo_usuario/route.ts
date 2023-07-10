
import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
    
    try {
    const { username_email } = await req.json()

    if (username_email === '') {
        return NextResponse.json ('')
    }

    const tipo_usuario = await db.user.findUnique({
        where: {
            email: username_email,
        },
        select: {
            tipo_usuario: true,
        }
    })
    return NextResponse.json (tipo_usuario!['tipo_usuario'])
} catch (err) {
    return NextResponse.json ('Error')
}
}