import '../styles/global.css'
import 'katex/dist/katex.css'
import 'antd/dist/reset.css'
import Layout from './_layout'
import Head from 'next/head'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aline Monteiro</title>
        <link rel="icon" href="/logo-psi.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
