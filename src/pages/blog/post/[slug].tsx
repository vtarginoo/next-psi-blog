import { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '../../../styles/slug.module.css' // Supondo que você tenha um arquivo de estilos
import getBlogIndex from '../../../lib/notion/getBlogIndex'
import getPageData from '../../../lib/notion/getPageData'
import { renderBlock } from '../../../lib/helpers/renderBlock'

export async function getStaticPaths() {
  const postsTable = await getBlogIndex()

  const paths = Object.keys(postsTable).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug }, preview }) {
  const postsTable = await getBlogIndex()
  const post = postsTable[slug]

  if (!post || (post.Published !== 'Yes' && !preview)) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    }
  }

  const postData = await getPageData(post.id)
  post.Authors = 'Youssef Yunes'
  post.content = postData.blocks

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  }
}

const RenderPost = ({ post, redirect }) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && !post) {
      router.replace(redirect)
    }
  }, [redirect, post])

  if (router.isFallback) {
    return <div className={styles.textBlock}>Loading...</div>
  }

  if (!post) {
    return (
      <div className={styles.textBlock}>
        <p>Post não encontrado, redirecionando...</p>
      </div>
    )
  }

  const postDate = post.Date
    ? new Date(post.Date).toLocaleDateString()
    : 'Data desconhecida'
  const authors = post.Authors || 'Autor desconhecido'

  return (
    <>
      <div className={styles.textBlock}>
        <h1 className={styles.header}>{post.Page || ''}</h1>
        {authors && <div className={styles.textBlock}>By: {authors}</div>}
        {postDate && <div className={styles.textBlock}>Posted: {postDate}</div>}
        <hr />

        {/* Imagem de capa do post */}
        {post.Image && (
          <div className={styles.imageContainer}>
            <img
              src={post.Image}
              alt={post.Page}
              className={styles.coverImage}
            />
          </div>
        )}

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {post.content?.map((block, blockIdx) => {
          const { value } = block
          const { type, properties, id } = value
          return renderBlock(type, properties, value, id)
        })}
      </div>
    </>
  )
}

export default RenderPost
