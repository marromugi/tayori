// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const apiRes = await fetch('https://jsonplaceholder.typicode.com/todos/')
    const data = await apiRes.json()
    res.status(200).json(data)
  }
}

export default handler
