import BlogSection from '../components/home/blog-section'
import CurriculumCard from '../components/home/curriculum-card'
import Testimonial from '../components/home/testimonial'
import { fetchPosts } from '../lib/helpers/fetch-posts'

export async function getStaticProps() {
  const posts = await fetchPosts(0, 4)
  return {
    props: {
      latestPosts: posts,
    },
  }
}

export default function Index({ latestPosts }) {
  return (
    <>
      <Testimonial />
      <CurriculumCard />
      <BlogSection posts={latestPosts} loading={false} />
    </>
  )
}
