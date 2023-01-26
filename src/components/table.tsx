import { SpringValue, useSpringValue, animated } from "@react-spring/web";
import clsx from "clsx";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useMemo } from "react";
import { getSummary } from "../services/api";
import { useHabitsStore } from "../store/useHabitsStore";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-days";
import { EditHabitPopover } from "./edit-habit-popover";

type TableNodes = {
  value: Date | null;
};

const headers = ["D", "S", "T", "Q", "Q", "S", "S"];

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
  const { setSelectedDate } = useHabitsStore(
    useCallback(
      (state) => ({
        setSelectedDate: state.setSelectedDate,
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

  const grid = clsx(window.innerWidth, {
    "grid grid-rows-7 grid-cols-7 gap-3": window.innerWidth < 768,
    "grid grid-rows-7 grid-flow-col gap-3": window.innerWidth >= 768,
  });

  return (
    <div
      className={`grid grid-cols-7 grid-rows-7 gap-3 lg:grid-flow-col lg:grid-cols-1`}
    >
      {elements?.map((d) => (
        <EditHabitPopover key={d?.value?.toString()} canRender={!!d?.value}>
          <animated.div
            style={{
              transform: progress.to((v) => `scale(${v})`),
            }}
            className={`flex h-10 w-10 cursor-pointer items-center  justify-center rounded-lg font-bold transition-colors duration-200 ${
              !d.value
                ? "cursor-not-allowed border-2 border-zinc-700 bg-transparent"
                : "bg-violet-700 hover:bg-violet-300"
            }`}
            onClick={() => {
              if (!d.value) return;
              setSelectedDate(d?.value);
            }}
          />
        </EditHabitPopover>
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

  const grid = clsx(window.innerWidth, {
    "grid grid-cols-7 grid-flow-row gap-3": window.innerWidth < 768,
    "grid grid-rows-7 grid-flow-row gap-3": window.innerWidth >= 768,
  });

  return (
    <div
      className={"flex w-full flex-col items-center justify-center lg:flex-row"}
    >
      <div
        className={`
        grid grid-flow-row grid-cols-7 gap-3 lg:grid-cols-1 lg:grid-rows-7
      `}
      >
        {headers.map((header, idx) => (
          <span
            key={idx}
            className={
              "flex h-10 w-10 items-center justify-center font-bold text-zinc-400"
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
