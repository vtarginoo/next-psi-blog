import getBlogIndex from '../notion/getBlogIndex'
import getNotionUsers from '../notion/getNotionUsers'

export const fetchPosts = async (limit = 0, preview = false) => {
  const postsTable = await getBlogIndex()

  const authorsToGet = new Set<string>()
  let posts = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      if (!preview && !post.IsPublished) return null

      post.Image = post.Image || '/no-image.jpeg'
      post.Authors = Array.isArray(post.Authors) ? post.Authors : []
      post.Authors.forEach((author) => authorsToGet.add(author))

      return post
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  if (limit > 0) {
    posts = posts.slice(0, limit) // Limite opcional
  }

  // Recupera os autores
  const { users } = await getNotionUsers([...authorsToGet])

  posts.forEach((post) => {
    post.Authors = post.Authors.map((id) => users[id]?.full_name || 'Unknown')
  })

  return posts
}
