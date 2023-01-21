import { X } from 'phosphor-react';
import { memo, useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Dialog } from './dialog';

const weekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const NewHabit = memo(({ ...props }) => {
  const isOpen = useStore((state) => state.isNewHabitModalOpen);
  const setIsOpen = useStore((state) => state.setIsNewHabitModalOpen);

  const [weekDaysSelected, setWeekDaysSelected] = useState<number[]>([]);

  const handleWeekDaySelected = (day: number) => {
    if (weekDaysSelected.includes(day)) {
      setWeekDaysSelected(weekDaysSelected.filter((d) => d !== day));
    } else {
      setWeekDaysSelected([...weekDaysSelected, day]);
    }
  };

  const getIfWeekDayIsSelected = (day: number) => {
    return weekDaysSelected.includes(day);
  };

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form className={'flex flex-col flex-1 gap-3 relative'}>
        <span className={'text-3xl font-extrabold text-white'}>
          Criar Hábito
        </span>
        <div className={'absolute -top-2 -right-2'}>
          <X
            onClick={() => setIsOpen(false)}
            weight={'bold'}
            className={
              'w-6 h-6 text-zinc-400 cursor-pointer hover:text-violet-600 transition-colors duration-200'
            }
          />
        </div>
        <span className={`text-white font-semibold`}>
          Qual seu comprometimento?
        </span>
        <input
          type={'text'}
          placeholder={'Exercícios, dormir bem, etc...'}
          className={`bg-zinc-800 rounded-lg placeholder:text-zinc-400 p-4 w-full max-h-[52px] text-white transition duration-300
            focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50
            `}
        />
        <span className={`text-white font-semibold`}>Qual a recorrência?</span>
        <div className={'flex flex-col gap-2 w-full'}>
          {weekDays.map((day, index: number) => (
            <div key={day} className={'flex items-center gap-3 '}>
              <Checkbox
                checked={getIfWeekDayIsSelected(index)}
                onClick={() => handleWeekDaySelected(index)}
              />
              <span className={'text-white'}>{day}</span>
            </div>
          ))}
        </div>
        <Button variant={'green'} icon={'plus'}>
          Confirmar
        </Button>
      </form>
    </Dialog>
  );
});
