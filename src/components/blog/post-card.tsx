import { Card } from 'antd'
import Link from 'next/link'
import styles from './post-card.module.css'

const { Meta } = Card

const PostCard = ({ post }) => {
  // Adicionando o console.log para verificar o valor de post.Slug

  const postDate = post.Date
    ? new Date(post.Date).toLocaleDateString()
    : 'Unknown date'
  const authors =
    Array.isArray(post.Authors) && post.Authors.length > 0
      ? post.Authors.join(', ')
      : 'Autor desconhecido'

  return (
    <Card
      hoverable
      cover={
        <img
          alt={post.Page || 'Sem título'}
          src={post.Image || '/default-image.jpg'} // Fallback para imagem padrão
          className={styles.postImage}
        />
      }
      className={styles.postCard}
    >
      <Meta
        title={
          // Link para a página de post com o slug correto
          <Link href={`/blog/post/${post.Slug}`} legacyBehavior>
            <a>{post.Page}</a>
          </Link>
        }
        description={
          <>
            <p className={styles.postMeta}>
              {postDate} | {authors}
            </p>
            <Link href={`/blog/post/${post.Slug}`} legacyBehavior>
              <a className={styles.readMore}>Leia mais</a>
            </Link>
          </>
        }
      />
    </Card>
  )
}

export default PostCard
