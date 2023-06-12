// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const prisma = new PrismaClient()

    if(req.method === "GET") {
        try {
            const getmuseos = await prisma.museos.findMany({})
            res.status(200).json(getmuseos)
        } catch (error) {
            res.status(400).json({ error: error })
        }
  }
}