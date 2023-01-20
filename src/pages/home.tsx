import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Dialog } from '../components/dialog';
import { getHabits } from '../services/api';
import { useStore } from '../store/useStore';

export function Home() {
  const { data, isLoading, isError } = useQuery('habits', getHabits);

  const { setError, setHabits, setLoading } = useStore((state) => ({
    setLoading: state.setLoadingHabits,
    setError: state.setErrorHabits,
    setHabits: state.setHabits,
  }));

  useEffect(() => {
    setLoading(isLoading);
    setError(isError);
    setHabits(data ?? []);
  }, [data, isLoading, isError]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div className={'flex flex-col gap-3 items-center'}>
      <h1 className={'text-3xl text-white'}>Home</h1>
      <button
        className={'text-xl text-white font-bold bg-violet-500 p-3 rounded-lg'}
        onClick={handleOpen}
      >
        toggle dialog
      </button>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        <h1 className={'text-3xl text-white'}>Dialog</h1>
      </Dialog>
    </div>
  );
}
