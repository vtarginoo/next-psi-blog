import { useRouter } from 'next/router'
import getBlogIndex from '../../../lib/notion/getBlogIndex'
import getPageData from '../../../lib/notion/getPageData'
import { useEffect } from 'react'
import { textBlock } from '../../../lib/notion/renderers'
import styles from './slug.module.css' // Importando o arquivo CSS

export async function getStaticPaths() {
  // Obter todos os slugs de posts do banco de dados ou API
  const postsTable = await getBlogIndex()

  // Mapear para pegar os slugs
  const paths = Object.keys(postsTable).map((slug) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: true, // true permite fallback para quando um slug não está presente
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
  console.log(post.content)

  // Aqui, adicione um console.log para verificar os dados
  //console.log(post)

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

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        {(post.content || []).map((block, blockIdx) => {
          const { value } = block
          const { type, properties, id } = value

          let toRender = []

          switch (type) {
            case 'text':
              if (properties) {
                toRender.push(
                  <div className={styles.textBlock} key={id}>
                    {properties.title}
                  </div>
                )
              }
              break
            case 'image':
            case 'video':
            case 'embed': {
              const { display_source } = value.format || {}
              toRender.push(
                <div className={styles.mediaWrapper} key={id}>
                  {type === 'image' ? (
                    <img src={display_source} alt="Post Image" />
                  ) : (
                    <video src={display_source} controls />
                  )}
                </div>
              )
              break
            }
            case 'quote':
              const quoteTitle = properties?.title || 'Default quote text'
              toRender.push(
                <div className={styles.quoteBlock} key={id}>
                  {quoteTitle}
                </div>
              )
              break
            case 'header':
              const headerTitle = properties?.title || 'Default header'
              toRender.push(
                <h1 className={styles.header} key={id}>
                  {headerTitle}
                </h1>
              )
              break
            case 'sub_header':
              const subHeaderTitle = properties?.title || 'Default sub-header'
              toRender.push(
                <h2 className={styles.subHeader} key={id}>
                  {subHeaderTitle}
                </h2>
              )
              break
            case 'bookmark': {
              const { link, title, description } = properties
              const { bookmark_cover } = value.format || {}
              toRender.push(
                <div className={styles.bookmark} key={id}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookmarkLink}
                  >
                    <h4>{title}</h4>
                    <p>{description}</p>
                    <img
                      src={bookmark_cover}
                      alt={title}
                      className={styles.bookmarkImage}
                    />
                  </a>
                </div>
              )
              break
            }
            default:
              console.log('Unknown block type', type)
              break
          }

          return toRender
        })}
      </div>
    </>
  )
}

export default RenderPost
