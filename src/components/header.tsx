import { useHabitsStore } from "../store/useHabitsStore";
import { Button } from "./button";
import Logo from "./../assets/logo.svg";
import { useEffect } from "react";

export const Header = () => {
  const setNewHabitModalOpen = useHabitsStore(
    (state) => state.setIsNewHabitModalOpen
  );

  return (
    <div
      className={
        "mx-auto flex w-full max-w-lg flex-col items-center justify-between gap-8 px-4 lg:w-1/2 lg:flex-row lg:gap-4"
      }
    >
      <img
        src={Logo}
        alt={"Logo"}
        className={"h-full max-h-[72px] w-full max-w-[150px]"}
      />
      <Button
        icon={"plus"}
        variant={"violet"}
        onClick={() => setNewHabitModalOpen(true)}
        className={"w-full max-w-[200px]"}
      >
        Novo Hábito
      </Button>
    </div>
  );
};
