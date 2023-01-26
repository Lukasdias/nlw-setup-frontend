import { useSpring, animated } from "@react-spring/web";
import clsx from "clsx";
import { memo, useEffect } from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
}

export const Loading: React.FC<LoadingProps> = memo(({ ...props }) => {
  const checkSize = props.size ?? "md";
  const size = clsx(checkSize, {
    "w-5 h-5": checkSize === "sm",
    "w-10 h-10": checkSize === "md",
    "w-12 h-12": checkSize === "lg",
  });
  return (
    <div className="overflow-hidden">
      <div
        className={`${size} $ flex animate-spin rounded-full border-2 border-violet-500 border-t-violet-700 bg-transparent`}
      />
    </div>
  );
});
