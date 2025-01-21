import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BlogIndexRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/blog/1') // Redireciona para a página 1
  }, [router])

  return null // Nada será renderizado
}
