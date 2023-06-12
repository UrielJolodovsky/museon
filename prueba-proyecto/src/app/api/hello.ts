// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  return res.send(`Hello ${body.name}, you just parsed the request body!`);
}