import styled from 'styled-components'
import { FaEnvelope, FaPhone, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Contact() {
  return (
    <Container>
      <Card>
        <Logo src="/logo-psi.png" alt="Logo" />
        <Title>Entre em Contato</Title>
        <Description>
          Siga-me nas redes sociais ou entre em contato diretamente.
        </Description>

        {/* Contatos */}
        <ContactInfo>
          <ContactItem
            href="https://linkedin.com/in/seu-perfil"
            target="_blank"
            color="#0077b5"
          >
            <FaLinkedin />
            <span>/seu-perfil</span>
          </ContactItem>
          <ContactItem
            href="https://instagram.com/seu-perfil"
            target="_blank"
            color="#e4405f"
          >
            <FaInstagram />
            <span>@seu-perfil</span>
          </ContactItem>
          <ContactItem href="mailto:seuemail@example.com" color="#d44638">
            <FaEnvelope />
            <span>seuemail@example.com</span>
          </ContactItem>
          <ContactItem href="tel:+5511999999999" color="#34af23">
            <FaPhone />
            <span>+55 11 99999-9999</span>
          </ContactItem>
        </ContactInfo>
      </Card>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #ffffff;
  padding: 40px;
`

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 500px;
  width: 100%;
`

const Logo = styled.img`
  width: 200px;
  margin-bottom: 2rem;
  margin-top: -30px;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`

const Description = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-size: 1.2rem;
  color: ${(props) => props.color};
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  svg {
    font-size: 2rem;
  }

  &:hover {
    background: ${(props) => props.color + '20'};
    transform: scale(1.05);
  }
`
