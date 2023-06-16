// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
    
    const prisma = new PrismaClient()
    
    try {
        const getmuseos = await prisma.museos.findMany({})
        return new Response(getmuseos)
    } catch (error) {
        return new Response("Something went wrong with the museums" , {status: 400})
    }
}