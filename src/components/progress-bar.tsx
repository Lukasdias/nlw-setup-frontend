import { memo, useEffect } from "react";
import * as ExternalProgressBar from "@radix-ui/react-progress";
import { useTransition, animated, useSpring, easings } from "@react-spring/web";

export const ProgressBar: React.FC<ExternalProgressBar.ProgressProps> = memo(
  ({ ...props }) => {
    const [spring, api] = useSpring(() => ({
      from: { width: "0%" },
      to: { width: `${props.value}%` },
      delay: 250,
    }));

    useEffect(() => {
      api.start({ width: `${props.value}%` });
    }, [props.value]);

    return (
      <ExternalProgressBar.Root
        value={100}
        className={
          "flex h-3 w-full max-w-[330px] overflow-hidden rounded-full bg-zinc-700"
        }
      >
        <animated.div style={spring}>
          <ExternalProgressBar.Indicator
            className={"h-full w-full bg-violet-600"}
          />
        </animated.div>
      </ExternalProgressBar.Root>
    );
  }
);
