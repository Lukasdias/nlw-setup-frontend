import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Checkbox } from '../components/checkbox';
import { Dialog } from '../components/dialog';
import { NewHabit } from '../components/new-habit';
import { Button } from '../components/button';
import { ProgressBar } from '../components/progress-bar';
import { getHabits } from '../services/api';
import { useStore } from '../store/useStore';
import { EditHabit } from '../components/edit-habit';
import { Header } from '../components/header';
import { useSpring, animated } from '@react-spring/web';
import { Table } from '../components/table';

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

  const [spring, api] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(100%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
  }));

  return (
    <animated.div
      style={spring}
      className={'flex flex-1 flex-col gap-3 items-center justify-center'}
    >
      <Header />
      <Table />
    </animated.div>
  );
}
