import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Spin } from 'antd'
import styles from '../../styles/blog.module.css'
import Head from 'next/head'

export default function BlogIndexRedirect() {
  const router = useRouter()
  const [loading, setLoading] = useState(true) // Estado de carregamento

  useEffect(() => {
    // Define o estado de loading como true quando começar o redirecionamento
    setLoading(true)

    // Realiza o redirecionamento para a página 1
    router.replace('/blog/1').then(() => {
      // Após o redirecionamento, podemos parar o loading
      setLoading(false)
    })
  }, [router])

  return (
    <>
      <Head>
        <title>Redirecionando para o Blog</title>
        <link rel="icon" href="/logo-adv.jpeg" />
      </Head>
      <div className={styles.redirectContainer}>
        {/* Exibe o spinner enquanto o redirecionamento ocorre */}
        <Spin spinning={loading} tip="Redirecionando..." />
      </div>
    </>
  )
}
