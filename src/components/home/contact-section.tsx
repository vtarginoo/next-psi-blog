import { useRouter } from 'next/router'
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa'
import styled from 'styled-components'

const ContactSection = () => {
  const router = useRouter()

  return (
    <ContactSectionWrapper>
      <SectionHeader>
        <h2>Agende sua sessão presencial ou online</h2>
        <Separator />
      </SectionHeader>

      <ContactContent>
        <ContactInfo>
          <p>
            Você pode optar pelo atendimento online ou presencialmente no meu
            consultório na Tijuca, Rio de Janeiro.
          </p>

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
          <ContactItem
            href="mailto:contato@alinemonteiro.com.br"
            color="#d44638"
          >
            <FaEnvelope />
            <span>contato@alinemonteiro.com.br</span>
          </ContactItem>
          <ContactItem href="tel:+5521999999999" color="#34af23">
            <FaPhone />
            <span>+55 21 99999-9999</span>
          </ContactItem>
        </ContactInfo>

        <LocationContainer>
          <MapTitle>
            <FaMapMarkerAlt /> Localização
          </MapTitle>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.748697693932!2d-43.23627571422257!3d-22.92263818490453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997e4194455555%3A0x250549d64ab7bf9f!2sRua%3A%20Almirante%20Cochrane%2C%20280%20-%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020550-040!5e0!3m2!1spt-BR!2sbr!4v1739295399684!5m2!1spt-BR!2sbr"
            width="100%"
            height="200"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
          />
          <LocationText>
            <strong>
              Rua Almirante Cochrane, nº280 - Sala 903, Tijuca - Rio de Janeiro
            </strong>
          </LocationText>
          <Button onClick={() => router.push('/consultorio')}>
            Conheça o consultório
          </Button>
        </LocationContainer>
      </ContactContent>
    </ContactSectionWrapper>
  )
}

export default ContactSection

// Styled Components

const ContactSectionWrapper = styled.section`
  width: 100%;
  background: #d99962;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
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

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`

const Separator = styled.div`
  width: 80px;
  height: 4px;
  background-color: #2a3c3f;

  margin-top: 0.5rem;
`

const ContactContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 1rem;
  max-width: 1200px;
  background-color: #f4f4f4; /* Mudando para um tom acinzentado */
  border-radius: 15px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Efeito de relevo suave */

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #2a3c3f;

  p {
    margin-bottom: 10px;
  }
`

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-size: 1.1rem;
  color: ${(props) => props.color};
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background: ${(props) => props.color + '20'};
    transform: scale(1.05);
  }
`

const LocationContainer = styled.div`
  max-width: 500px;
  text-align: left;
`

const MapTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2a3c3f;
`

const LocationText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #2a3c3f;
`

const Button = styled.button`
  background: #2a3c3f;
  color: #d99962;
  font-size: 1rem;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #f3f3f3;
  }
`
