import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import { FaCar, FaShoppingBag, FaSubway } from 'react-icons/fa'

const ConsultorioPage = () => {
  return (
    <ConsultorioPageWrapper>
      <SectionHeader>
        <h2>Sobre o Consultório</h2>
        <Separator />
      </SectionHeader>

      <Description>
        <p>
          Nosso consultório está localizado em um ponto estratégico da Tijuca,
          fácil de acessar tanto de transporte público quanto de carro.
        </p>

        <p>
          O espaço foi planejado para oferecer um ambiente acolhedor e livre de
          julgamentos, garantindo conforto e tranquilidade durante as nossas
          sessões de terapia presencial.
        </p>

        <p>
          Fica a apenas alguns minutos do metrô e de importantes pontos da
          região, facilitando o acesso para quem vem de diversos lugares.
        </p>
      </Description>

      <CarouselWrapper>
        <Carousel autoplay arrows infinite={false}>
          <div>
            <ImageWrapper>
              <StyledImage
                src="/consultorio/consultorio1.jpeg"
                alt="Consultório - 1"
              />
            </ImageWrapper>
          </div>
          <div>
            <ImageWrapper>
              <StyledImage
                src="/consultorio/consultorio2.jpeg"
                alt="Consultório - 2"
              />
            </ImageWrapper>
          </div>
        </Carousel>
      </CarouselWrapper>

      <HowToGetThereWrapper>
        <SectionHeader>
          <h2>Como Chegar</h2>
          <Separator />
        </SectionHeader>

        <HowToGetDescription>
          <p>
            Nosso consultório está localizado no Prédio Saens Peña Office, Sala
            903, Rua Almirante Cochrane, nº 280, Tijuca, RJ.
          </p>

          <IconWrapper>
            <FaSubway size={30} color="#2a3c3f" />
            <p>5 minutos a pé do metrô Saens Peña</p>
          </IconWrapper>
          <IconWrapper>
            <FaShoppingBag size={30} color="#2a3c3f" />
            <p>10 minutos do Shopping Tijuca</p>
          </IconWrapper>
          <IconWrapper>
            <FaCar size={30} color="#2a3c3f" />
            <p>Estacionamento disponível nas proximidades</p>
          </IconWrapper>
        </HowToGetDescription>

        <LocationWrapper>
          <BuildingImage>
            <StyledImage
              src="/consultorio/predio.jpg"
              alt="Prédio do Consultório"
            />
          </BuildingImage>
          <MapWrapper>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.748697693932!2d-43.23627571422257!3d-22.92263818490453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e4194455555%3A0x250549d64ab7bf9f!2sRua%3A%20Almirante%20Cochrane%2C%20280%20-%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020550-040!5e0!3m2!1spt-BR!2sbr!4v1739295399684!5m2!1spt-BR!2sbr"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen
              loading="lazy"
            />
          </MapWrapper>
        </LocationWrapper>
      </HowToGetThereWrapper>
    </ConsultorioPageWrapper>
  )
}

export default ConsultorioPage

// Styled Components

const ConsultorioPageWrapper = styled.div`
  width: 100%;
  padding: 50px 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
`

const SectionHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
  color: #2a3c3f;

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    font-weight: bold;
    margin: 0 20px;
  }
`

const Separator = styled.div`
  width: 80px;
  height: 4px;
  background-color: #2a3c3f;
  margin-top: 0.5rem;
`

const Description = styled.div`
  max-width: 800px;
  margin-bottom: 40px;
  font-size: 1.2rem;
  text-align: center;
  color: #555;
`

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  height: 500px;
  position: relative;
  background-color: #f9f9f9;
  overflow: hidden;
  margin: 0 auto;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`

const CarouselWrapper = styled.div`
  width: 80%;
  max-width: 1000px;
  background-color: #f9f9f9;

  .ant-carousel .slick-slide {
    text-align: center;
    border-radius: 8px;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: #2a3c3f;
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .ant-carousel .slick-prev::after,
  .ant-carousel .slick-next::after {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-left: 3px solid white;
    border-top: 3px solid white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ant-carousel .slick-prev {
    left: 10px !important;
  }

  .ant-carousel .slick-next {
    right: 10px !important;
  }

  .ant-carousel .slick-prev::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  .ant-carousel .slick-next::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`

const HowToGetThereWrapper = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HowToGetDescription = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #555;
`

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;

  p {
    margin-top: 5px;
    font-size: 1rem;
  }
`

const LocationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-top: 40px;
`

const BuildingImage = styled.div`
  width: 45%;
  height: 250px;
  overflow: hidden;
  margin-right: 20px;
`

const MapWrapper = styled.div`
  width: 55%;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
`
