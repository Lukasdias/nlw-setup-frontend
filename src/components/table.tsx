import { SpringValue, useSpringValue, animated } from '@react-spring/web';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-days';

type TableNodes = {
  value: Date | null;
};

const headers = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const availableDates = generateRangeDatesFromYearStart();

const minimumDateRange = 18 * 7; // 18 semanas

const amountOfDatesToFill = minimumDateRange - availableDates.length;

const data: TableNodes[] = Array.from({ length: amountOfDatesToFill }).map(
  (_, idx: number) => ({
    value: idx <= availableDates.length ? availableDates[idx] : null,
  })
);

const TableRow: React.FC<{
  progress: SpringValue<number>;
  elements: TableNodes[];
}> = memo(({ elements, progress }) => {
  const { setSelectedDate, setIsEditHabitModalOpen } = useStore(
    useCallback(
      (state) => ({
        setSelectedDate: state.setSelectedDate,
        setIsEditHabitModalOpen: state.setIsEditHabitModalOpen,
      }),
      []
    )
  );

  useEffect(() => {
    progress.start({
      to: 1,
      delay: 250,
    });
  }, []);

  return (
    <div className={'grid grid-rows-7 grid-flow-col gap-3'}>
      {elements?.map((d) => (
        <animated.div
          key={d?.value?.toString()}
          style={{
            transform: progress.to((v) => `scale(${v})`),
          }}
          className={`w-10 h-10 flex justify-center items-center  rounded-lg font-bold cursor-pointer transition-colors duration-200 ${
            !d.value
              ? 'bg-transparent border-2 border-zinc-700 cursor-not-allowed'
              : 'bg-violet-700 hover:bg-violet-300'
          }`}
          onClick={() => {
            if (!d.value) return;
            setSelectedDate(d?.value);
            setIsEditHabitModalOpen(true);
          }}
        />
      ))}
    </div>
  );
});

export const Table = memo(() => {
  const progress = useSpringValue(0, {
    delay: 250,
    config: {
      mass: 2,
      tension: 80,
    },
  });

  return (
    <div className={'w-full flex gap-2 items-center justify-center'}>
      <div className={'grid grid-rows-7 grid-flow-row gap-3'}>
        {headers.map((header, idx) => (
          <span
            key={idx}
            className={
              'w-10 h-10 flex justify-center items-center text-zinc-400 font-bold'
            }
          >
            {header}
          </span>
        ))}
      </div>
      <TableRow progress={progress} elements={data} />
    </div>
  );
});
