import { X } from "phosphor-react";
import { memo, useCallback, useEffect, useState } from "react";
import { useHabitsStore } from "../store/useHabitsStore";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Dialog } from "./dialog";

const weekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export const NewHabit: React.FC = memo(({ ...props }) => {
  const { isOpen, setIsOpen } = useHabitsStore(
    useCallback(
      (state) => ({
        isOpen: state.isNewHabitModalOpen,
        setIsOpen: state.setIsNewHabitModalOpen,
      }),
      []
    )
  );

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
      <form className={"relative flex flex-1 flex-col gap-3"}>
        <span className={"text-3xl font-extrabold text-white"}>
          Criar Hábito
        </span>
        <div className={"absolute -top-2 -right-2"}>
          <X
            onClick={() => setIsOpen(false)}
            weight={"bold"}
            className={
              "h-6 w-6 cursor-pointer text-zinc-400 transition-colors duration-200 hover:text-violet-600"
            }
          />
        </div>
        <span className={`font-semibold text-white`}>
          Qual seu comprometimento?
        </span>
        <input
          type={"text"}
          placeholder={"Exercícios, dormir bem, etc..."}
          className={`max-h-[52px] w-full rounded-lg bg-zinc-800 p-4 text-white transition duration-300 placeholder:text-zinc-400
            focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50
            `}
        />
        <span className={`font-semibold text-white`}>Qual a recorrência?</span>
        <div className={"flex w-full flex-col gap-2"}>
          {weekDays.map((day, index: number) => (
            <div key={day} className={"flex items-center gap-3 "}>
              <Checkbox
                checked={getIfWeekDayIsSelected(index)}
                onClick={() => handleWeekDaySelected(index)}
              />
              <span className={"text-white"}>{day}</span>
            </div>
          ))}
        </div>
        <Button variant={"green"} icon={"check"}>
          Confirmar
        </Button>
      </form>
    </Dialog>
  );
});
