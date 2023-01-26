import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/header";
import { useSpring, animated } from "@react-spring/web";
import { Table } from "../components/table";
import { Loading } from "../components/loading";
import { useHabitsService } from "../services/api";

export function Home() {
  const [spring, api] = useSpring(() => ({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
  }));

  const { getSummary } = useHabitsService();

  // useEffect(() => {
  //   getSummary();
  // }, []);

  return (
    <animated.div
      style={spring}
      className={"m-auto flex w-full flex-col gap-6 p-6"}
    >
      <Header />
      <Table />
    </animated.div>
  );
}
