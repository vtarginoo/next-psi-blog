import { Carousel, Spin } from 'antd'
import styled from 'styled-components'
import PostCard from '../blog/post-card'
import React from 'react'

const BlogSection = ({ posts = [], loading }) => {
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
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      ) : posts.length > 0 ? (
        <StyledCarouselWrapper>
          <StyledCarousel
            autoplay
            dots={true} // Mostra pontos de navegação em telas pequenas
            slidesToShow={3} // Mostra 3 cards em telas grandes
            slidesToScroll={1} // Avança 1 card por vez
            infinite
            arrows={true} // Mostra as setas de navegação
            responsive={[
              {
                breakpoint: 1024, // Para tablets
                settings: {
                  slidesToShow: 2, // Mostra 2 slides
                  arrows: true, // Mantém as setas
                },
              },
              {
                breakpoint: 768, // Para celulares
                settings: {
                  slidesToShow: 1, // Mostra 1 slide
                  arrows: false, // Remove as setas
                  dots: true, // Mostra os pontos
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
      font-size: 1.5rem; /* Reduz a fonte em celulares */
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
    width: 100%; /* Ocupar toda a largura em celulares */
  }
`

const StyledCarousel = styled(Carousel)`
  .slick-prev,
  .slick-next {
    color: #999;
    font-size: 24px;
    z-index: 10;

    @media (max-width: 768px) {
      font-size: 20px; /* Ajusta o tamanho das setas */
    }
  }

  .slick-prev:hover,
  .slick-next:hover {
    color: #666;
  }

  .slick-dots li button {
    background-color: #999; /* Cor dos pontos */
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`

const NoPosts = styled.div`
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1rem; /* Ajusta a fonte em telas menores */
    text-align: center;
  }
`
