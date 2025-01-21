import Link from 'next/link'
import { useRouter } from 'next/router'
import { Col, Row } from 'antd'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import PostCard from '../../components/blog/post-card'
import styles from '../../styles/blog.module.css'
import { postIsPublished } from '../../lib/blog-helpers'

const POSTS_PER_PAGE = 6 // Número de posts por página

export async function getStaticProps({ preview, params }) {
  const postsTable = await getBlogIndex()

  const authorsToGet = new Set<string>()
  const posts = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      if (!preview && !postIsPublished(post)) {
        return null
      }

      post.Image = post.Image || '/no-image.jpeg'
      post.Authors = Array.isArray(post.Authors) ? post.Authors : []
      post.Authors.forEach((author) => authorsToGet.add(author))

      return post
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  // Recuperando os dados dos autores
  const { users } = await getNotionUsers([...authorsToGet])

  posts.forEach((post) => {
    post.Authors = post.Authors.map((id) => users[id]?.full_name || 'Unknown')
  })

  const page = parseInt(params.page, 10) || 1 // Página atual
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  return {
    props: {
      preview: preview || false,
      posts: posts.slice(start, end),
      totalPosts: posts.length,
      currentPage: page,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()
  const totalPosts = Object.keys(postsTable).length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

const Index = ({ posts = [], preview, totalPosts, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const router = useRouter()

  return (
    <>
      {preview && (
        <div className={styles.previewAlertContainer}>
          <div className={styles.previewAlert}>
            <b>Note:</b> Viewing in preview mode{' '}
            <Link href={`/api/clear-preview`} legacyBehavior>
              <button className={styles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={styles.blogIndex}>
        <h1>Blog do Yuyu</h1>
        {posts.length === 0 ? (
          <p className={styles.noPosts}>There are no posts yet</p>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {posts.map((post) => (
                <Col xs={24} sm={12} md={8} lg={8} key={post.Slug}>
                  <PostCard post={post} />
                </Col>
              ))}
            </Row>
            <div className={styles.pagination}>
              {currentPage > 1 && (
                <button onClick={() => router.push(`/blog/${currentPage - 1}`)}>
                  Anterior
                </button>
              )}
              <span>
                Página {currentPage} de {totalPages}
              </span>
              {currentPage < totalPages && (
                <button onClick={() => router.push(`/blog/${currentPage + 1}`)}>
                  Próxima
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Index
