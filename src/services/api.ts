import axios from 'axios';

export type Habit = {
  id: string;
  title: string;
  createdAt: string;
}

const api = axios.create(
  {baseURL: 'http://localhost:3333',}
);

export const getHabits = async () => {
  const response = await api.get('/habits');
  const { data } = response;
  const habits = data as Habit[];
  return habits;
}