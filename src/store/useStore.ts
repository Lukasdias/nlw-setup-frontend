import { create } from 'zustand'
import { immer}  from 'zustand/middleware/immer'
import { Habit } from '../services/api'

type State = {
  habits: {
    data: Habit[]
    loading: boolean
    error: boolean
  }
}

type Actions = {
  setLoadingHabits: (loading: boolean) => void
  setErrorHabits: (error: boolean) => void
  setHabits: (habits: Habit[]) => void
}

export const useStore = create(
  immer<State & Actions>((set, get) => ({
    habits: {
      data: [],
      loading: false,
      error: false,
    },
    setLoadingHabits: (loading) => { set((state) => { state.habits.loading = loading }) },
    setErrorHabits: (error) => { set((state) => { state.habits.error = error }) },
    setHabits: (habits) => { set((state) => { state.habits.data = habits }) },
  })
))