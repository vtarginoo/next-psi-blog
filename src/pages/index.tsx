import { useEffect, useState } from 'react'
import BlogSection from '../components/home/blog-section'
import CurriculumCard from '../components/home/curriculum-card'
import Testimonial from '../components/home/testimonial'
import { fetchPosts } from '../lib/helpers/fetch-posts'
import Head from 'next/head'

export async function getStaticProps() {
  const posts = await fetchPosts(0, 4)
  return {
    props: {
      latestPosts: posts,
    },
    revalidate: 60, // Revalida a página a cada 60 segundos
  }
}

export default function Index({ latestPosts }) {
  const [loading, setLoading] = useState(true) // Controle de loading

  useEffect(() => {
    // Define o estado de loading como false após os posts serem carregados
    if (latestPosts.length > 0) {
      setLoading(false)
    }
  }, [latestPosts])

  return (
    <>
      <Head>
        <title>Youssef Yunes - Home</title>
        <link rel="icon" href="/logo-adv.jpeg" />
      </Head>
      <Testimonial />
      <CurriculumCard />
      <BlogSection posts={latestPosts} loading={loading} />
    </>
  )
}
