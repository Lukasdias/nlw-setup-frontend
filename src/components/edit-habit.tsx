import dayjs from 'dayjs';
import { X } from 'phosphor-react';
import { memo, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { Checkbox } from './checkbox';
import { Dialog } from './dialog';
import { ProgressBar } from './progress-bar';

export const EditHabit = memo(({ ...props }) => {
  const selectedDate = useStore((state) => state.selectedDate);
  const setSelectedDate = useStore((state) => state.setSelectedDate);
  const isOpen = useStore((state) => state.isEditHabitModalOpen);
  const setIsOpen = useStore((state) => state.setIsEditHabitModalOpen);

  useEffect(() => {
    /// ...
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(null);
    }
  }, [isOpen]);

  if (!selectedDate) return null;

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className={'flex flex-col flex-1 gap-3 relative'}>
        <div className={'absolute -top-2 -right-2'}>
          <X
            onClick={() => setIsOpen(false)}
            weight={'bold'}
            className={
              'w-6 h-6 text-zinc-400 cursor-pointer hover:text-violet-600 transition-colors duration-200'
            }
          />
        </div>
        <span className={'text-zinc-400 font-semibold'}>
          {dayjs(selectedDate).locale('pt-br').format('dddd')}
        </span>
        <span className={'text-white font-extrabold text-3xl'}>
          {dayjs(selectedDate).locale('pt-br').format('DD/MM')}
        </span>
        <ProgressBar value={50} />
        <div className={'flex flex-col mt-4 aw-full'}>
          <div className={'flex items-center gap-3 '}>
            <Checkbox checked={false} onClick={() => undefined} />
            <span className={'text-white'}>Teste </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
});
