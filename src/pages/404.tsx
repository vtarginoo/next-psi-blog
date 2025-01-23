import React from 'react'
import { NextPage } from 'next'

const Custom404: NextPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Página não encontrada</h1>
      <p>
        A página que você está procurando não existe ou ocorreu um erro ao
        carregá-la.
      </p>
    </div>
  )
}

export default Custom404
