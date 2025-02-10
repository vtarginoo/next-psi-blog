import getBlogIndex from '../notion/getBlogIndex'

export const fetchPosts = async (start = 0, limit = 0, preview = false) => {
  try {
    const postsTable = await getBlogIndex()

    let posts = Object.keys(postsTable)
      .map((slug) => {
        const post = postsTable[slug]

        // Filtra posts não publicados se não estiver em modo de preview
        if (!preview && post.Published !== 'Yes') return null

        post.Image = post.Image || '/no-image.jpeg'
        post.Authors = Array.isArray(post.Author) ? post.Author : []
        // Aqui, simplesmente substituímos os autores pela string "Aline Monteiro"
        post.Authors = post.Authors.length ? ['Aline Monteiro'] : []

        return post
      })
      .filter(Boolean)

    posts = posts.sort(
      (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
    )
    posts = posts.slice(start, start + limit)

    //const { users } = await getNotionUsers([...authorsToGet])

    return posts
  } catch (error) {
    console.error('Erro ao buscar posts:', error)
    throw error
  }
}
