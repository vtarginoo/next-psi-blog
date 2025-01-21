import { RpcResponse } from '../interface/IRpcResponse'
import rpc from './rpc'

interface NotionUser {
  id: string
  value: {
    given_name?: string
    family_name?: string
  }
}

export default async function getNotionUsers(ids: string[]) {
  const response = (await rpc('getRecordValues', {
    requests: ids.map((id: string) => ({
      id,
      table: 'notion_user',
    })),
  })) as RpcResponse

  const results = response.results || []
  const users: Record<string, { full_name: string }> = {}

  for (const result of results) {
    const { value } = result || { value: {} }
    const { given_name, family_name } = value
    let full_name = given_name || ''

    if (family_name) {
      full_name = `${full_name} ${family_name}`
    }
    users[result.id] = { full_name }
  }

  return { users }
}
