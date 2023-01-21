import { SpringValue, useSpringValue, animated } from '@react-spring/web';
import dayjs from 'dayjs';
import { memo, useEffect, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-days';

const headers = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const TableRow: React.FC<{
  progress: SpringValue<number>;
  data: Date[];
}> = memo(({ data, progress }) => {
  const setSelectDate = useStore((state) => state.setSelectedDate);
  const setIsEditHabitModalOpen = useStore(
    (state) => state.setIsEditHabitModalOpen
  );

  useEffect(() => {
    progress.start(1);
  }, []);

  return (
    <div className={'w-full flex gap-2'}>
      {data.map((date) => (
        <animated.div
          style={{
            transform: progress.to((v) => `scale(${v})`),
          }}
          className={
            'w-10 h-10 flex justify-center items-center bg-violet-700 rounded-lg font-bold cursor-pointer hover:bg-violet-600 transition-colors duration-200'
          }
          onClick={() => {
            setSelectDate(date);
            setIsEditHabitModalOpen(true);
          }}
        />
      ))}
    </div>
  );
});

export const Table = memo(() => {
  const data = generateRangeDatesFromYearStart();

  const progress = useSpringValue(0, {
    delay: 250,
    config: {
      mass: 2,
      tension: 80,
    },
  });

  const domingos = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 0);
  }, [data]);

  const segundas = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 1);
  }, [data]);

  const tercas = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 2);
  }, [data]);

  const quartas = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 3);
  }, [data]);

  const quintas = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 4);
  }, [data]);

  const sextas = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 5);
  }, [data]);

  const sabados = useMemo(() => {
    return data.filter((d) => dayjs(d).day() === 6);
  }, [data]);

  const setSelectDate = useStore((state) => state.setSelectedDate);
  const setIsEditHabitModalOpen = useStore(
    (state) => state.setIsEditHabitModalOpen
  );
  return (
    <div className={'flex w-full max-w-5xl overflow-x-auto gap-3'}>
      <div className={'flex flex-col gap-3'}>
        {headers.map((header) => (
          <span
            className={
              'w-10 h-10 flex justify-center items-center text-zinc-400 font-bold'
            }
          >
            {header}
          </span>
        ))}
      </div>
      <div className={'flex flex-col gap-3'}>
        <TableRow progress={progress} data={domingos} />
        <TableRow progress={progress} data={segundas} />
        <TableRow progress={progress} data={tercas} />
        <TableRow progress={progress} data={quartas} />
        <TableRow progress={progress} data={quintas} />
        <TableRow progress={progress} data={sextas} />
        <TableRow progress={progress} data={sabados} />
      </div>
    </div>
  );
});
