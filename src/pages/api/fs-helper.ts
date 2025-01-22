import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import { join } from 'path'

const cacheDirectory = './cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'GET') {
    const filePath = join(cacheDirectory, 'data.json')
    try {
      const data = await fs.readFile(filePath, 'utf8')
      res.status(200).json(JSON.parse(data))
    } catch (error) {
      res.status(500).json({ error: 'Error reading file' })
    }
  } else if (method === 'POST') {
    const { data } = req.body
    const filePath = join(cacheDirectory, 'data.json')
    try {
      await fs.writeFile(filePath, JSON.stringify(data), 'utf8')
      res.status(200).json({ message: 'File written successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Error writing file' })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
