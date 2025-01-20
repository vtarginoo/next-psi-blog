import Link from 'next/link'

import { postIsPublished } from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import PostCard from '../../components/blog/post-card'
import { Col, Row } from 'antd'
import styles from '../../styles/blog.module.css'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex() // Função que busca os posts

  const authorsToGet = new Set<string>() // Definindo o tipo como string para IDs de autores
  const posts = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]

      // Se o post não estiver publicado e o modo preview não estiver ativado, ignore o post
      if (!preview && !postIsPublished(post)) {
        return null
      }

      // Certificando que o campo Image existe
      post.Image = post.Image || '/no-image.jpeg' // Caso não tenha imagem, atribui uma imagem padrão

      // Garantir que post.Authors seja um array de strings
      post.Authors = Array.isArray(post.Authors) ? post.Authors : [] // Se não for um array, define como array vazio

      // Adicionando autores ao Set
      post.Authors.forEach((author) => {
        authorsToGet.add(author)
      })

      return post
    })
    .filter(Boolean)

  // Recuperando os dados dos autores
  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id]?.full_name || 'Unknown') // Garantir que se o autor não for encontrado, exibe 'Unknown'
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Index = ({ posts = [], preview }) => {
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
          <Row gutter={[16, 16]}>
            {posts.map((post) => (
              <Col xs={24} sm={12} md={8} lg={8} key={post.Slug}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  )
}

export default Index
