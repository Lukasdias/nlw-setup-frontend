import { useMemo } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { getHabitStore, useHabitsStore } from "../store/useHabitsStore";

export type DayHabits = {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  completedHabits: {
    id: string;
  }[];
};

export type Summary = {
  id: string;
  data: string;
  completed: number;
  possible: number;
};

type Habit = {
  id: string;
  title: string;
  createdAt: string;
};

const api = axios.create({ baseURL: "http://localhost:3333" });

const createHabits = async (
  title: string,
  weekDays: number[]
): Promise<void> => {
  try {
    useHabitsStore.setState({
      isSendingNewHabit: true,
    });
    await api.post("/habits", { title, weekDays });
  } catch (error) {
    console.log(error);
  } finally {
    useHabitsStore.setState({
      isSendingNewHabit: false,
    });
  }
};

const getDayHabits = async (date: Date): Promise<void> => {
  try {
    useHabitsStore.setState({
      dayHabits: {
        ...getHabitStore().dayHabits,
        isLoading: true,
        isError: false,
      },
    });
    const { data } = await api.get(
      `/day?date=${dayjs(date).format("YYYY-MM-DD")}T10:00:00.000Z`
    );
    useHabitsStore.setState({
      dayHabits: {
        data: {
          possibleHabits: data.possibleHabits ?? [],
          completedHabits: data.completedHabits ?? [],
        },
        isLoading: false,
        isError: false,
      },
    });
  } catch (error) {
    console.log(error);
    useHabitsStore.setState({
      dayHabits: {
        ...getHabitStore().dayHabits,
        isError: true,
      },
    });
  } finally {
    useHabitsStore.setState({
      dayHabits: {
        ...getHabitStore().dayHabits,
        isLoading: false,
      },
    });
  }
};

const toggleDayHabit = async (id: string): Promise<void> => {
  try {
    useHabitsStore.setState({
      isChangingHabitStatus: true,
    });
    await api.patch(`/habits/${id}/toggle`);
  } catch (error) {
    console.log(error);
  } finally {
    useHabitsStore.setState({
      isChangingHabitStatus: false,
    });
  }
};

const getSummary = async (): Promise<void> => {
  try {
    useHabitsStore.setState({
      summary: {
        ...getHabitStore().summary,
        isLoading: true,
        isError: false,
      },
    });
    const { data } = await api.get("/summary");
    useHabitsStore.setState({
      summary: data,
    });
  } catch (error) {
    console.log(error);
    useHabitsStore.setState({
      summary: {
        ...getHabitStore().summary,
        isError: true,
      },
    });
  } finally {
    useHabitsStore.setState({
      summary: {
        ...getHabitStore().summary,
        isLoading: false,
      },
    });
  }
};

export const useHabitsService = () => {
  return {
    createHabits,
    getDayHabits,
    toggleDayHabit,
    getSummary,
  };
};
