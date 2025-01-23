interface NotionUser {
  id: string
  value: {
    given_name?: string
    family_name?: string
  }
}

export default async function getNotionUsers(ids: string[]) {
  // Mapeamento dos IDs para os nomes completos, apenas retornando um usuário fixo
  const users: Record<string, { full_name: string }> = {}

  // Definindo Youssef YUnes como o nome fixo para qualquer ID passado
  ids.forEach((id) => {
    users[id] = { full_name: 'Youssef Yunes' }
  })

  return { users }
}
