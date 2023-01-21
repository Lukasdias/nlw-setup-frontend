import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { Outlet } from 'react-router-dom';
import { EditHabit } from './edit-habit';
import { NewHabit } from './new-habit';
import 'dayjs/locale/pt-br';

const queryClient = new QueryClient();

const Container: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={
        'w-screen h-screen flex bg-background justify-center items-center overflow-hidden'
      }
    >
      {children}
    </div>
  );
};

export function AppContainer() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Outlet />
        <NewHabit />
        <EditHabit />
      </Container>
    </QueryClientProvider>
  );
}
