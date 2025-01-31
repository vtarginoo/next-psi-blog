import { Carousel, Spin } from 'antd'
import styled from 'styled-components'
import PostCard from '../blog/post-card'
import React from 'react'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const BlogSection = ({ posts = [] }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Lógica de controle de carregamento durante a navegação
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true)
    }

    const handleRouteComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)
    router.events.on('routeChangeError', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
      router.events.off('routeChangeError', handleRouteComplete)
    }
  }, [router])

  return (
    <BlogSectionWrapper>
      <SectionHeader>
        <h2>
          Quer conhecer mais sobre meu trabalho? Visite o blog com os principais
          artigos!
        </h2>
        <Separator />
      </SectionHeader>

      {loading ? (
        <RedirectContainer>
          <Spin size="large" />
        </RedirectContainer>
      ) : posts.length > 0 ? (
        <StyledCarouselWrapper>
          <StyledCarousel
            autoplay
            dots={true}
            slidesToShow={3}
            slidesToScroll={1}
            infinite
            arrows={true}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  arrows: true,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  arrows: false,
                  dots: true,
                },
              },
            ]}
          >
            {posts.map((post) => (
              <div key={post.Slug}>
                <PostCard post={post} />
              </div>
            ))}
          </StyledCarousel>
        </StyledCarouselWrapper>
      ) : (
        <NoPosts>
          <p>Nenhum post encontrado.</p>
        </NoPosts>
      )}
    </BlogSectionWrapper>
  )
}

export default BlogSection

const Separator = styled.div`
  width: 80px;
  height: 4px;
  background-color: #d99962;
  margin-top: 0.5rem;
`

const BlogSectionWrapper = styled.section`
  width: 100%;
  background: #f9f9f9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`

const SectionHeader = styled.div`
  margin-bottom: 30px;

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: bold;
    color: #2a3c40;
    text-align: center;
    margin: 0 20px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const StyledCarouselWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCarousel = styled(Carousel)`
  .slick-prev,
  .slick-next {
    color: #999;
    font-size: 24px;
    z-index: 10;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .slick-prev:hover,
  .slick-next:hover {
    color: #666;
  }

  .slick-dots li button {
    background-color: #999;
  }
`

const NoPosts = styled.div`
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`

// Novo estilo para o carregamento com o RedirectContainer
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
