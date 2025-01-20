import '../styles/global.css'
import 'katex/dist/katex.css'
import 'antd/dist/reset.css'
import Layout from './_layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
