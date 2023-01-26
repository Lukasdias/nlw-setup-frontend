import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Summary, DayHabits } from "../services/api";

type State = {
  summary: {
    data: Summary[];
    isLoading: boolean;
    isError: boolean;
  };
  dayHabits: {
    data: DayHabits;
    isLoading: boolean;
    isError: boolean;
  };
  selectedDate: Date | null;
  isNewHabitModalOpen: boolean;
  isEditHabitPopoverOpen: boolean;
  isSendingNewHabit: boolean;
  isChangingHabitStatus: boolean;
};

type Actions = {
  setSummary: (summary: Summary[]) => void;
  setIsLoadingSummary: (isLoading: boolean) => void;
  setIsErrorSummary: (isError: boolean) => void;
  setDayHabits: (dayHabits: DayHabits) => void;
  setIsLoadingDayHabits: (isLoading: boolean) => void;
  setIsErrorDayHabits: (isError: boolean) => void;
  setIsNewHabitModalOpen: (isOpen: boolean) => void;
  setIsEditHabitPopoverOpen: (isOpen: boolean) => void;
  setSelectedDate: (date: Date | null) => void;
  toggleSelectedHabit: (habitId: string) => void;
};

export const useHabitsStore = create(
  devtools(
    subscribeWithSelector(
      immer<State & Actions>((set, get) => ({
        isSendingNewHabit: false,
        isChangingHabitStatus: false,
        selectedDate: null,
        isNewHabitModalOpen: false,
        isEditHabitPopoverOpen: false,
        dayHabits: {
          data: {
            possibleHabits: [],
            completedHabits: [],
          },
          isLoading: false,
          isError: false,
        },
        summary: {
          data: [],
          isLoading: false,
          isError: false,
        },
        setIsLoadingDayHabits: (isLoading) => {
          set((state) => {
            state.dayHabits.isLoading = isLoading;
          });
        },
        setIsErrorDayHabits: (isError) => {
          set((state) => {
            state.dayHabits.isError = isError;
          });
        },
        setIsLoadingSummary: (isLoading) => {
          set((state) => {
            state.summary.isLoading = isLoading;
          });
        },
        setIsErrorSummary: (isError) => {
          set((state) => {
            state.summary.isError = isError;
          });
        },
        setDayHabits: (dayHabits) => {
          set((state) => {
            state.dayHabits.data = dayHabits;
          });
        },
        setSummary: (summary) => {
          set((state) => {
            state.summary.data = summary;
          });
        },
        setIsNewHabitModalOpen: (isOpen) => {
          set((state) => {
            state.isNewHabitModalOpen = isOpen;
          });
        },
        setIsEditHabitPopoverOpen: (isOpen) => {
          set((state) => {
            state.isEditHabitPopoverOpen = isOpen;
          });
        },
        setSelectedDate: (date) => {
          set((state) => {
            state.selectedDate = date;
          });
        },
        toggleSelectedHabit: (habitId) => {
          set((state) => {
            const habit = state.dayHabits.data?.possibleHabits.find(
              (habit) => habit.id === habitId
            );
            const isHabitCompleted =
              !!state.dayHabits.data?.completedHabits.find(
                (habit) => habit.id === habitId
              );
            if (habit) {
              if (isHabitCompleted) {
                state.dayHabits.data.completedHabits =
                  state.dayHabits.data.completedHabits.filter(
                    (habit) => habit.id !== habitId
                  );
              } else {
                state.dayHabits.data.completedHabits.push(habit);
              }
            }
          });
        },
      }))
    )
  )
);

export const getHabitStore = () => {
  return useHabitsStore.getState();
};
