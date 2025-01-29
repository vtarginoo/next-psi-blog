import { useRouter } from 'next/router'
import { Col, Row, Spin } from 'antd'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import PostCard from '../../components/blog/post-card'
import styles from '../../styles/blog.module.css'
import { fetchPosts } from '../../lib/helpers/fetch-posts'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

const POSTS_PER_PAGE = 6

export async function getStaticProps({ preview, params }) {
  const page = parseInt(params.page, 10) || 1
  const start = (page - 1) * POSTS_PER_PAGE

  const allPosts = await fetchPosts(
    (page - 1) * POSTS_PER_PAGE,
    POSTS_PER_PAGE,
    preview
  )
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE)

  return {
    props: {
      preview: preview || false,
      posts,
      totalPosts: allPosts.length,
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
  const [loading, setLoading] = useState(true) // Controle de loading
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const router = useRouter()

  useEffect(() => {
    // Define o estado de loading como false após os posts serem carregados
    if (posts.length > 0) {
      setLoading(false)
    }
  }, [posts])

  return (
    <>
      <Head>
        <title>Youssef Yunes - Blog</title>
        <link rel="icon" href="/logo-adv.jpeg" />
      </Head>
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

        {/* Exibe o indicador de carregamento enquanto os posts estão sendo carregados */}
        <Spin spinning={loading} tip="Carregando posts...">
          <div className={styles.blogIndexContent}>
            {posts.length === 0 ? (
              <p className={styles.noPosts}>Não há posts ainda</p>
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
                    <button
                      onClick={() => router.push(`/blog/${currentPage - 1}`)}
                    >
                      Anterior
                    </button>
                  )}
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <button
                      onClick={() => router.push(`/blog/${currentPage + 1}`)}
                    >
                      Próxima
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </Spin>
      </div>
    </>
  )
}

export default Index
