import styled from 'styled-components'

// Componente funcional
const Testimonial = () => {
  return (
    <TestimonialContainer>
      <h2>Bem-vindos ao meu site</h2>
      <p>
        O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.
        O Lorem Ipsum tem vindo a ser o texto padrão usado por estas indústrias
        desde o ano de 1500, quando uma misturou os caracteres de um texto para
        criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas
        também o salto para a tipografia electrónica, mantendo-se essencialmente
        inalterada. Foi popularizada nos anos 60 com a disponibilização das
        folhas de Letraset, que continham passagens com Lorem Ipsum, e mais
        recentemente com os programas de publicação como o Aldus PageMaker que
        incluem versões do Lorem Ipsum.
      </p>
    </TestimonialContainer>
  )
}

export default Testimonial

const TestimonialContainer = styled.section`
  padding: 3rem; /* Espaçamento interno */
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  text-align: center; /* Centraliza o texto */
  gap: 1.5rem; /* Espaço entre título e parágrafo */
  height: 30rem;

  h2 {
    font-family: 'Poppins', sans-serif; /* Fonte Poppins */
    font-size: 2rem;
    font-weight: bold;
    color: #2a3c40; /* Cor do título */
    margin: 0 20px;
  }

  p {
    font-family: 'Poppins', sans-serif; /* Fonte Poppins */
    font-size: 1.1rem;
    color: #555;
    line-height: 1.6;
    max-width: 60%; /* Limita a largura do texto */
    text-align: justify; /* Alinha o texto justificado */
    margin: 0 auto; /* Centraliza horizontalmente */
  }

  /* Ajustes para telas menores */
  @media (max-width: 1024px) {
    height: auto;
    padding: 2rem;
    h2 {
      font-size: 1.8rem; /* Reduz o tamanho da fonte em tablets */
    }
    p {
      max-width: 80%; /* Aumenta a largura do texto em tablets */
      font-size: 1rem; /* Reduz a fonte para ajustar melhor o texto */
    }
  }

  /* Ajustes para celulares */
  @media (max-width: 768px) {
    padding: 1.5rem;
    h2 {
      font-size: 1.5rem; /* Ajusta a fonte do título para celulares */
    }
    p {
      max-width: 90%; /* Aumenta a largura do texto para celulares */
      font-size: 0.95rem; /* Reduz ainda mais o tamanho da fonte */
      text-align: left; /* Alinha o texto à esquerda */
    }
  }
`
