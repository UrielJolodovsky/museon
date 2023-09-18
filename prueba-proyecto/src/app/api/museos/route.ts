// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const getmuseos = await db.museos.findMany({
            select: {
                id: true,
                subimage: true,
                subname: true,
                name: true,
                role: true,
            }

        })
        return NextResponse.json(getmuseos, { status: 200 })
    } catch (error) {
        return new Response("Something went wrong with the museums", { status: 400 })
    }
}