import axios from 'axios'

// Função para ler o arquivo chamando a API
export const readFile = async (cacheFile: string) => {
  try {
    const response = await axios.get('/api/fs-helpers') // Chama a API para obter os dados do arquivo
    return response.data // Retorna o conteúdo do arquivo como JSON
  } catch (error) {
    console.warn('Failed to load file', error)
    throw error // Lança o erro para ser tratado em outro lugar, se necessário
  }
}

// Função para escrever no arquivo chamando a API
export const writeFile = async (cacheFile: string, data: any) => {
  try {
    await axios.post('/api/fs-helpers', { data }) // Envia os dados para o servidor salvar no arquivo
  } catch (error) {
    console.warn('Failed to write file', error)
    throw error // Lança o erro para ser tratado em outro lugar, se necessário
  }
}
