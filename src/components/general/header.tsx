import { Menu, Layout } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

const { Header: AntHeader } = Layout

const navItems = [
  { label: 'HOME', page: '/' },
  { label: 'CONTATO', page: '/contact' },
  { label: 'CONSULTORIO', page: '/consultorio' },
  { label: 'BLOG', page: '/blog' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = ({ titlePre = '' }: { titlePre?: string }) => {
  const { pathname } = useRouter()

  return (
    <StyledHeader>
      <Head>
        <title>{`${titlePre ? `${titlePre} | ` : ''}My Notion Blog`}</title>
        <meta
          name="description"
          content="An example Next.js site using Notion for the blog"
        />
        <meta name="og:title" content="My Notion Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@_ijjk" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>

      <LogoContainer>
        <LogoImage src="/logo-psi.png" alt="Logo" />
      </LogoContainer>

      <StyledMenu
        mode="horizontal"
        selectedKeys={[pathname]}
        items={navItems.map((item) => ({
          key: item.page || item.label,
          label: (
            <Link href={item.page || ''} passHref>
              {item.label}
            </Link>
          ),
        }))}
      />
    </StyledHeader>
  )
}

export default Header

// Styled Components
const StyledHeader = styled(AntHeader)`
  background-color: #d99962; /* Cor do fundo do Header */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Itens começam logo após a logo */
  padding: 0 20px;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ##ffffff; /* Cor de fundo para a logo */
  padding: 0 20px; /* Removido o padding vertical, mantendo o horizontal */
  border-radius: 4px; /* Mais reto, sem bordas arredondadas */
  margin-right: 20px; /* Espaço entre a logo e os itens de navegação */
`

const LogoImage = styled.img`
  height: 40px; /* Ajuste conforme o tamanho necessário */
`

const StyledMenu = styled(Menu)`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  background: none;
  border-bottom: none;

  /* Fonte personalizada */
  .ant-menu-item {
    font-family: 'Poppins', sans-serif; /* Fonte personalizada */
    color: #ffffff; /* Cor padrão do texto */
    border-bottom: 2px solid transparent;
  }

  /* Hover no link */
  .ant-menu-item a:hover {
    color: #1b3037ff !important; /* Cor da fonte durante o hover */
    background-color: transparent; /* Remover fundo do hover */
  }

  /* Hover para o item */
  .ant-menu-item:hover {
    color: #1b3037ff !important; /* Cor da fonte ao passar o mouse */
    background-color: transparent; /* Remover fundo do hover */
  }

  /* Remover a barra azul em qualquer estado */
  .ant-menu-item::after {
    display: none !important;
  }

  /* Quando o item for selecionado */
  .ant-menu-item-selected {
    color: #1b3037ff !important; /* Cor da fonte do item selecionado */
    background-color: transparent !important; /* Remover fundo de seleção */
  }
`
