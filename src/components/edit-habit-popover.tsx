import * as Popover from "@radix-ui/react-popover";
import { useTransition, animated } from "@react-spring/web";
import dayjs from "dayjs";
import { X } from "phosphor-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProgressBar } from "./progress-bar";
import { Checkbox } from "./checkbox";
import { useHabitsService } from "../services/api";
import { useHabitsStore } from "../store/useHabitsStore";
import { Loading } from "./loading";

interface EditHabitPopoverProps {
  children: React.ReactNode;
  canRender: boolean;
}

const AnimatedPopover = animated(Popover.Content);

export const EditHabitPopover: React.FC<EditHabitPopoverProps> = ({
  ...props
}) => {
  const { canRender } = props;
  const [open, setOpen] = useState(false);
  const { getDayHabits, toggleDayHabit } = useHabitsService();
  const { dayHabits, toggleSelectedHabit } = useHabitsStore((state) => ({
    selectedDate: state.selectedDate,
    dayHabits: state.dayHabits,
    toggleSelectedHabit: state.toggleSelectedHabit,
  }));

  const transitions = useTransition(open && canRender, {
    from: { transform: "scale(0.3)", opacity: 0 },
    enter: { transform: "scale(1)", opacity: 1 },
    leave: { transform: "scale(0.3)", opacity: 0 },
  });

  useEffect(() => {
    if (open && canRender && selectedDate) {
      getDayHabits(selectedDate);
    }
  }, [open, canRender]);

  const onChange = (e: boolean) => {
    setOpen(e);
  };

  const selectedDate = useHabitsStore((state) => state.selectedDate);

  const onClickHabit = (habitId: string) => {
    toggleDayHabit(habitId);
    toggleSelectedHabit(habitId);
  };

  return (
    <Popover.Root open={open && canRender} onOpenChange={onChange}>
      <Popover.Trigger asChild>{props.children}</Popover.Trigger>
      {transitions(
        (style, item) =>
          item && (
            <AnimatedPopover
              forceMount
              className="z-50 w-96 rounded-lg bg-zinc-900 p-5 shadow-lg"
              style={style}
              sideOffset={5}
            >
              <animated.div className={"relative flex flex-1 flex-col gap-3"}>
                <span className={"font-semibold text-zinc-400"}>
                  {dayjs(selectedDate).locale("pt-br").format("dddd")}
                </span>
                <span className={"text-3xl font-extrabold text-white"}>
                  {dayjs(selectedDate).locale("pt-br").format("DD/MM")}
                </span>
                <ProgressBar value={10} />
                <div className={"aw-full mt-4 flex flex-col gap-2"}>
                  {dayHabits.isLoading ? (
                    <Loading size={"lg"} />
                  ) : (
                    <>
                      {dayHabits?.data?.possibleHabits?.map((habit) => (
                        <div
                          key={habit.id}
                          className={"flex items-center gap-3 "}
                        >
                          <Checkbox
                            checked={
                              !!dayHabits?.data?.completedHabits?.find(
                                (h) => h.id === habit.id
                              )
                            }
                            onClick={() => {
                              onClickHabit(habit.id);
                            }}
                          />
                          <span className={"text-white"}>{habit.title}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {!dayHabits && (
                    <span className={"animate-pulse text-white"}>
                      Você não tem hábitos cadastrados neste dia
                    </span>
                  )}
                </div>
              </animated.div>
              <Popover.Arrow className="fill-current text-white" />
              <Popover.PopoverClose className="absolute right-2 top-2">
                <X
                  weight={"bold"}
                  className={
                    "h-6 w-6 cursor-pointer text-zinc-400 transition-colors duration-200 hover:text-violet-600"
                  }
                />
              </Popover.PopoverClose>
            </AnimatedPopover>
          )
      )}
    </Popover.Root>
  );
};
