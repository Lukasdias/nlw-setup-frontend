import { memo, useEffect } from 'react';
import * as ExternalProgressBar from '@radix-ui/react-progress';
import { useTransition, animated, useSpring, easings } from '@react-spring/web';

export const ProgressBar: React.FC<ExternalProgressBar.ProgressProps> = memo(
  ({ ...props }) => {
    const [spring, api] = useSpring(() => ({
      from: { width: '0%' },
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
          'w-full max-w-[330px] rounded-full h-3 overflow-hidden flex bg-zinc-700'
        }
      >
        <animated.div style={spring}>
          <ExternalProgressBar.Indicator
            className={'w-full h-full bg-violet-600'}
          />
        </animated.div>
      </ExternalProgressBar.Root>
    );
  }
);
