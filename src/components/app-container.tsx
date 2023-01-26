import { useState } from "react";

import { Outlet } from "react-router-dom";
import { NewHabit } from "./new-habit";
import "dayjs/locale/pt-br";

const Container: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={
        "relative flex h-screen max-h-screen w-screen flex-col overflow-y-auto bg-background"
      }
    >
      {children}
    </div>
  );
};

export function AppContainer() {
  return (
    <Container>
      <Outlet />
      <NewHabit />
    </Container>
  );
}
