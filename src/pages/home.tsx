import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getHabits } from '../services/api'
import { useStore } from '../store/useStore'

export function Home() {
  const {data, isLoading, isError} = useQuery('habits', getHabits)

  const {setError,setHabits,setLoading} = useStore(
    (state) => ({
      setLoading: state.setLoadingHabits,
      setError: state.setErrorHabits,
      setHabits: state.setHabits
    })
  )

  useEffect(() => {
    setLoading(isLoading)
    setError(isError)
    setHabits(data ?? [])
  }, [data, isLoading, isError])

  if(isError) {
    return (
      <div className={'w-screen h-screen flex items-center justify-center gap-2 bg-zinc-800'}>
        <div className={'text-xl text-violet-600 font-bold'}>Error</div>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div className={'w-screen h-screen flex items-center justify-center gap-2 bg-zinc-800'}>
        <div className={'text-xl text-violet-600 font-bold'}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={'w-screen h-screen flex items-center justify-center gap-2 bg-zinc-800'}>
      <div className={'flex gap-2 '}>
        {data?.map((habit) => (
          <div key={habit.id} className='p-4 rounded-lg flex justify-center items-center bg-violet-600' />
        ))}
      </div>
    </div>
  )
}