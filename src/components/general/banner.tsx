import styled from 'styled-components'

export default function Banner() {
  return (
    <>
      <StyledBanner>
        <img src="/banner-adv.png" alt="Banner" />
      </StyledBanner>
    </>
  )
}

const StyledBanner = styled.div`
  width: 100vw;
  height: 300px;
  background-color: #1b3037ff;
  position: relative;
  overflow: hidden; /* Garante que nada ultrapasse os limites do banner */
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
`

const BannerArea = styled.div`
  width: 100vw; /* A área do banner ocupa toda a largura da tela, 100% da largura da viewport */
  background-color: #1b3037ff; /* Cor de fundo sólida para a área do banner */
  overflow: hidden; /* Garante que nada ultrapasse os limites do banner */
  position: relative; /* Necessário para o posicionamento do conteúdo interno */
  margin: 0; /* Garantir que o BannerArea não tenha margem */
`
