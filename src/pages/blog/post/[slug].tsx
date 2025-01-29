import { useRouter } from 'next/router'
import getBlogIndex from '../../../lib/notion/getBlogIndex'
import getNotionUsers from '../../../lib/notion/getNotionUsers'
import getPageData from '../../../lib/notion/getPageData'
import { HTMLProps, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

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
  post.content = postData.blocks

  const { users } = await getNotionUsers(post.Authors || [])
  post.Authors = Object.keys(users).map((id) => users[id].full_name)

  // Aqui, adicione um console.log para verificar os dados
  console.log(post)

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
    return <LoadingText>Loading...</LoadingText>
  }

  if (!post) {
    return (
      <NotFound>
        <p>Post não encontrado, redirecionando...</p>
      </NotFound>
    )
  }

  return (
    <Article>
      {/* Verifique se o título existe e renderize */}
      {post.Page && <Title>{post.Page}</Title>}

      {/* Verifique se a imagem existe e renderize */}
      {post.Image && (
        <Cover>
          <img
            src={post.Image}
            alt={post.Page || 'Post Cover'}
            width={800}
            height={400}
          />
        </Cover>
      )}

      <Content>
        {post.content.map((block, index) => (
          <Block key={index}>
            {/* Adicionando formatação ao conteúdo, caso o bloco tenha um título */}
            {block.value?.properties?.title &&
              block.value.properties.title[0] && (
                <BlockTitle>{block.value.properties.title[0][0]}</BlockTitle>
              )}
            {/* Adicionando conteúdo do parágrafo */}
            {block.value?.properties?.body && (
              <p>{block.value.properties.body[0]}</p>
            )}
          </Block>
        ))}
      </Content>
    </Article>
  )
}

const Article = styled.article`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`

const Cover = styled.div`
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
`

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #444;
`

const Block = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
`

const BlockTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #333;
`

const NotFound = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: #d9534f;
`
export default RenderPost
