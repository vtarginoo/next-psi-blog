import styled from 'styled-components'
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
} from 'react-icons/fa'

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
        {/* Localização */}
        <LocationContainer>
          <LocationText>
            Para você que mora no Rio de Janeiro e deseja atendimento
            presencial, o consultório está localizado no coração da Tijuca.
          </LocationText>
          <MapTitle>
            <FaMapMarkerAlt /> Localização
          </MapTitle>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.748697693932!2d-43.23627571422257!3d-22.92263818490453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e4194455555%3A0x250549d64ab7bf9f!2sRua%3A%20Almirante%20Cochrane%2C%20280%20-%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020550-040!5e0!3m2!1spt-BR!2sbr!4v1739295399684!5m2!1spt-BR!2sbr"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
          />
          <LocationText>
            <strong>Rua Almirante Cochrane, nº280/903 - 11º andar</strong>
          </LocationText>
        </LocationContainer>

        <ConsultorioButton href="/consultorio">
          Conheça o Consultório
        </ConsultorioButton>
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
const LocationContainer = styled.div`
  margin-top: 1.5rem;
  text-align: left;
`

const MapTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`

const LocationText = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`

const ConsultorioButton = styled.a`
  display: inline-block;
  background: #0077b5;
  color: white;
  font-size: 1rem;
  padding: 12px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background: #005f8e;
    transform: scale(1.05);
  }
`
