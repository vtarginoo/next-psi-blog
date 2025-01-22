import axios from 'axios' // Alterando para axios
import { API_ENDPOINT, NOTION_TOKEN } from './server-constants'

// Adicionando um tipo genérico <T> à função rpc
export default async function rpc<T>(fnName: string, body: any): Promise<T> {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env')
  }

  try {
    const res = await axios.post(`${API_ENDPOINT}/${fnName}`, body, {
      headers: {
        'content-type': 'application/json',
        cookie: `token_v2=${NOTION_TOKEN}`,
      },
    })

    return res.data as T // Axios já resolve o corpo da resposta
  } catch (error) {
    throw new Error(error.message || 'An error occurred during the RPC request')
  }
}

export async function getError(error: any) {
  return `Notion API error \n ${error.message}`
}

export function values(obj: any) {
  const vals: any = []

  Object.keys(obj).forEach((key) => {
    vals.push(obj[key])
  })
  return vals
}
