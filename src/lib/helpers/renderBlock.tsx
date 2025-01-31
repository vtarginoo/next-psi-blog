import styles from '../../styles/slug.module.css'

// Funções auxiliares para renderizar blocos

export const RenderTextBlock = ({ title, id }) => (
  <div className={styles.textBlock} key={id}>
    {title}
  </div>
)

export const RenderImageBlock = ({ src, id }) => (
  <div className={styles.mediaWrapper} key={id}>
    <img src={src} alt="Post Image" />
  </div>
)

export const RenderVideoBlock = ({ src, id }) => (
  <div className={styles.mediaWrapper} key={id}>
    <video src={src} controls />
  </div>
)

export const RenderQuoteBlock = ({ title, id }) => (
  <div className={styles.quoteBlock} key={id}>
    {title}
  </div>
)

export const RenderHeaderBlock = ({ title, id }) => (
  <h1 className={styles.header} key={id}>
    {title}
  </h1>
)

export const RenderSubHeaderBlock = ({ title, id }) => (
  <h2 className={styles.subHeader} key={id}>
    {title}
  </h2>
)

export const RenderBookmarkBlock = ({
  link,
  title,
  description,
  bookmark_cover,
  id,
}) => (
  <div className={styles.bookmark} key={id}>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.bookmarkLink}
    >
      <h4>{title}</h4>
      <p>{description}</p>
      <img src={bookmark_cover} alt={title} className={styles.bookmarkImage} />
    </a>
  </div>
)

// Novo componente para renderizar "divider"
export const RenderDividerBlock = ({ id }) => (
  <hr key={id} className={styles.divider} />
)

export const RenderBulletedListBlock = ({ items = [], id }) => {
  //console.log("Items passed to the component:", items); // Debug para ver os dados

  return (
    <ul key={id} className={styles.bulletedList}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, index) => {
          // Regex para detectar 'b\n' e separar título do conteúdo
          const match = item.match(/^(.*?): b\n (.*)$/)

          return (
            <li key={index} className={styles.bulletedItem}>
              {match ? (
                <>
                  <strong>{match[1]}</strong>: {match[2]}
                </>
              ) : (
                item
              )}
            </li>
          )
        })
      ) : (
        <li className={styles.bulletedItem}>No items available</li> // Mensagem de fallback
      )}
    </ul>
  )
}

// Função para mapear os blocos
export const renderBlock = (type, properties, value, id) => {
  switch (type) {
    case 'text':
      return <RenderTextBlock title={properties?.title} id={id} />
    case 'image':
      return <RenderImageBlock src={value.format?.display_source} id={id} />
    case 'video':
      return <RenderVideoBlock src={value.format?.display_source} id={id} />
    case 'quote':
      return (
        <RenderQuoteBlock
          title={properties?.title || 'Default quote text'}
          id={id}
        />
      )
    case 'header':
      return (
        <RenderHeaderBlock
          title={properties?.title || 'Default header'}
          id={id}
        />
      )
    case 'sub_header':
      return (
        <RenderSubHeaderBlock
          title={properties?.title || 'Default sub-header'}
          id={id}
        />
      )
    case 'bookmark':
      return (
        <RenderBookmarkBlock
          link={properties?.link}
          title={properties?.title}
          description={properties?.description}
          bookmark_cover={value.format?.bookmark_cover}
          id={id}
        />
      )
    case 'divider':
      return <RenderDividerBlock id={id} />

    case 'bulleted_list':
      return (
        <RenderBulletedListBlock
          items={[properties?.title?.map((item) => item.join(' ')).join('\n')]}
          id={id}
        />
      )
    default:
      console.log('Unknown block type', type)
      return null
  }
}
