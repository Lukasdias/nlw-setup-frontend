import { useStore } from '../store/useStore';
import { Button } from './button';
import Logo from './../assets/logo.svg';
import { useEffect } from 'react';

export const Header = () => {
  const setNewHabitModalOpen = useStore(
    (state) => state.setIsNewHabitModalOpen
  );

  return (
    <div className={'w-1/2 justify-between items-center flex'}>
      <img
        src={Logo}
        alt={'Logo'}
        className={'w-full max-w-[150px] h-full max-h-[72px]'}
      />
      <Button
        icon={'plus'}
        variant={'violet'}
        onClick={() => setNewHabitModalOpen(true)}
      >
        Novo Hábito
      </Button>
    </div>
  );
};
