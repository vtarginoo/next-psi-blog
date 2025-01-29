import '../styles/global.css'
import 'katex/dist/katex.css'
import 'antd/dist/reset.css'
import Layout from './_layout'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Youssef Yunes</title>
        <link rel="icon" href="/logo-adv.jpeg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
