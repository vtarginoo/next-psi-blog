import { Layout } from 'antd'
import styled from 'styled-components'

const { Footer } = Layout

export default function AppFooter() {
  return (
    <StyledFooter className="footer-adv">
      <p>
        © {new Date().getFullYear()} Youssef Yunes. Todos os direitos
        reservados.
      </p>
    </StyledFooter>
  )
}

// Estilização usando styled-components
const StyledFooter = styled(Footer)`
  background-color: #1b3037ff;
  color: #fff;
  text-align: center;
  padding: 16px;
  margin-top: auto; /* Garante que o footer fique fixado ao final do conteúdo */
`
