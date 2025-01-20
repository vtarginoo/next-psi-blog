import styled from 'styled-components'
import Header from '../components/general/header'
import { Footer } from 'antd/es/layout/layout'
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
`

const Content = styled.main`
  padding: 0px; /* Pode ajustar conforme necessário */
  background-color: #f5f5f5;
  flex-grow: 1; /* Para garantir que o conteúdo ocupe o espaço restante */
`
