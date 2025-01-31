import { useEffect, useState } from 'react'
import BlogSection from '../components/home/blog-section'
import CurriculumCard from '../components/home/curriculum-card'
import Testimonial from '../components/home/testimonial'
import { fetchPosts } from '../lib/helpers/fetch-posts'
import Head from 'next/head'
import { Spin } from 'antd'
import styled from 'styled-components'

export async function getStaticProps() {
  const posts = await fetchPosts(0, 4)
  return {
    props: {
      latestPosts: posts,
    },
    revalidate: 60, // Revalida a página a cada 60 segundos
  }
}

export default function Index({ latestPosts }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!latestPosts) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [latestPosts])

  return (
    <>
      <Head>
        <title>Youssef Yunes - Home</title>
        <link rel="icon" href="/logo-adv.jpeg" />
      </Head>

      {loading ? (
        <RedirectContainer>
          <StyledSpin size="large" />
        </RedirectContainer>
      ) : (
        <>
          <Testimonial />
          <CurriculumCard />
          <BlogSection posts={latestPosts} />
        </>
      )}
    </>
  )
}

const RedirectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  z-index: 9999; /* Garante que o carregamento fique acima de outros conteúdos */
`

const StyledSpin = styled(Spin)`
  font-size: 3rem;
  color: white;

  .ant-spin-dot {
    font-size: 5rem; /* Tamanho maior da animação de carregamento */
  }
`
