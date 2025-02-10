import styled from 'styled-components'

// Componente funcional
const CurriculumCard = () => {
  return (
    <CardSection>
      <ContentContainer>
        <HeaderBlock>
          <h3>Atuação Profissional</h3>
          <Separator />
        </HeaderBlock>
        <ul>
          <li>Desenvolvimento de interfaces web responsivas.</li>
          <li>Criação de layouts e integração com APIs.</li>
          <li>Experiência com frameworks como React, Next.js e Vue.</li>
          <li>Desenvolvimento de APIs RESTful.</li>
          <li>Gestão de banco de dados e otimização de consultas.</li>
          <li>Experiência com Node.js e Express.</li>
        </ul>
      </ContentContainer>
      <ImageContainer>
        <img src="/psi-curriculum.png" alt="Curriculum" />
      </ImageContainer>
    </CardSection>
  )
}

export default CurriculumCard

// Estilização do componente
const CardSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  background-color: #4b6464;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 100%; /* Limitar a largura máxima */
  height: 25rem;
  padding: 0rem;
  margin: 0 auto; /* Centralizar no meio da tela */

  @media (max-width: 768px) {
    flex-direction: column-reverse; /* Texto aparece abaixo da imagem em telas pequenas */
    align-items: center;
    height: auto;
    gap: 2rem;
  }
`

const ImageContainer = styled.div`
  flex: 50%; /* Mais espaço para a imagem */
  background-color: #4b6464;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: contain;
    max-height: 100%;
  }
`

const ContentContainer = styled.div`
  flex: 50%; /* Ajustado para equilibrar o espaço */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: flex-end; /* Centraliza horizontalmente com o restante do conteúdo */
  padding: 0 1rem; /* Padding lateral */

  h3 {
    font-size: 1.8rem;
    margin: 0; /* Remove margens padrão */
    color: #ffffff;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 1.5rem; /* Distância entre lista e separador */

    li {
      font-size: 1rem;
      color: #ffffff;
      margin-bottom: 0.8rem;
      text-align: left;

      &::before {
        content: '•';
        color: #d99962;
        margin-right: 0.5rem;
      }
    }
  }
`

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha título e separador com o restante do conteúdo */
  margin-bottom: 1rem; /* Espaçamento entre título e lista */
`

const Separator = styled.div`
  width: 80px; /* Define o tamanho horizontal */
  height: 4px; /* Define o tamanho vertical */
  background-color: #d99962;
  margin-top: 0.5rem; /* Espaço entre título e separador */
`
