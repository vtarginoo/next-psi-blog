import styled from 'styled-components'

export default function Banner() {
  return (
    <StyledBanner>
      <ContentWrapper>
        <img src="/banner-psi.png" alt="Banner" />
      </ContentWrapper>
    </StyledBanner>
  )
}

const StyledBanner = styled.div`
  width: 100vw;
  height: 40vh; /* Altura será 40% da tela */
  position: relative;
  overflow: hidden;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #425e5e; /* Cor de fundo para preencher espaços extras */

  /* Ajuste para dispositivos móveis */
  @media (max-width: 768px) {
    height: 30vh;
  }

  @media (max-width: 480px) {
    height: 25vh;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px; /* Define o limite da imagem */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Mantém a imagem cobrindo o espaço sem distorcer */
  }
`
