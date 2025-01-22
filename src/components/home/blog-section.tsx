import { Carousel } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../../styles/blog.module.css'
import { fetchPosts } from '../../lib/helpers/fetch-posts'
import PostCard from '../blog/post-card'

const BlogSection = () => {
  const [latestPosts, setLatestPosts] = useState([])

  useEffect(() => {
    const getLatestPosts = async () => {
      const posts = await fetchPosts(0, 4) // Busca os 4 primeiros posts
      setLatestPosts(posts)
    }

    getLatestPosts()
  }, [])

  return (
    <section className={styles.blogSection}>
      <div className={styles.sectionHeader}>
        <h2>
          Quer conhecer mais sobre meu trabalho? Visite o blog com os principais
          artigos!
        </h2>
      </div>

      <Carousel autoplay className={styles.carousel}>
        {latestPosts.length > 0 ? (
          latestPosts.map((post) => (
            <div key={post.Slug}>
              <PostCard post={post} /> {/* Utilize o PostCard */}
            </div>
          ))
        ) : (
          <div>
            <p>Carregando posts...</p>
          </div>
        )}
      </Carousel>
    </section>
  )
}

export default BlogSection
