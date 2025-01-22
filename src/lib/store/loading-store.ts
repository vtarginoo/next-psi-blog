import { create } from 'zustand'

interface LoadingStore {
  loading: boolean
  setLoading: (state: boolean) => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false, // Inicializa o estado de loading como false
  setLoading: (state) => set({ loading: state }), // Função para alterar o estado de loading
}))
