import axios from 'axios' // Alterando para axios
import { NextApiResponse } from 'next'
import { NOTION_TOKEN, API_ENDPOINT } from './server-constants'

export default async function getNotionAsset(
  res: NextApiResponse,
  assetUrl: string,
  blockId: string
): Promise<{
  signedUrls: string[]
}> {
  const requestURL = `${API_ENDPOINT}/getSignedFileUrls`
  try {
    const assetRes = await axios.post(
      requestURL,
      {
        urls: [
          {
            url: assetUrl,
            permissionRecord: {
              table: 'block',
              id: blockId,
            },
          },
        ],
      },
      {
        headers: {
          cookie: `token_v2=${NOTION_TOKEN}`,
          'content-type': 'application/json',
        },
      }
    )

    // Axios automaticamente resolve a resposta para o JSON
    const jsonResponse = assetRes.data as { signedUrls: string[] }

    if (!jsonResponse.signedUrls || !Array.isArray(jsonResponse.signedUrls)) {
      throw new Error('Invalid response format: missing signedUrls')
    }

    return jsonResponse
  } catch (error) {
    console.error('Request failed', error)
    res.json({ status: 'error', message: 'failed to load Notion asset' })
    throw new Error(error.message || 'An error occurred')
  }
}
