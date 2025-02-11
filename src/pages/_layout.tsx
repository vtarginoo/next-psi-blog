import styled from 'styled-components'
import Header from '../components/general/header'
import Banner from '../components/general/banner'
import AppFooter from '../components/general/footer'

export default function Layout({ children }) {
  return (
    <StyledLayout>
      <Banner />
      <Header titlePre="Home" />
      <Content>{children}</Content>
      <AppFooter />
    </StyledLayout>
  )
}

// Estilização usando styled-components
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%; /* Garante que o layout não ultrapasse a tela */
  overflow-x: hidden; /* Impede o overflow horizontal */
`

const Content = styled.main`
  padding: 0; /* Ajuste conforme necessário */
  background-color: #f5f5f5;
  flex-grow: 1; /* Para garantir que o conteúdo ocupe o espaço restante */
  width: 100%; /* Garante que o conteúdo ocupe toda a largura disponível */
  box-sizing: border-box; /* Evita que padding extra cause overflow */
`
