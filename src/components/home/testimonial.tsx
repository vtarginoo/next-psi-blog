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
  padding: 2rem; /* Espaçamento interno */
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  text-align: center; /* Centraliza o texto */
  gap: 1rem; /* Espaço entre título e parágrafo */
  height: 25rem;

  h2 {
    font-family: 'Poppins', sans-serif; /* Fonte Poppins */
    font-size: 1.8rem; /* Tamanho do título */
    color: #2a3c40;
    margin: 0;
  }

  p {
    font-family: 'Poppins', sans-serif; /* Fonte Poppins */
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    max-width: 60%; /* Limita a largura do texto */
    text-align: justify; /* Alinha o texto justificado */
    margin: 0 auto; /* Centraliza horizontalmente */
  }

  /* Ajustes para telas menores */
  @media (max-width: 768px) {
    p {
      max-width: 90%;
      height: auto;
      text-align: left;
      gap: 2rem;
      /* Alinha à esquerda em telas menores */
    }
  }
`
