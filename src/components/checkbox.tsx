import { CheckboxProps } from '@radix-ui/react-checkbox';
import * as ExternalCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

type CheckboxRef = {
  checked: boolean;
};

export const Checkbox: React.FC<CheckboxProps> = memo(({ ...props }) => {
  const checkTransitions = useTransition(props.checked, {
    from: { opacity: 0, transform: 'scale(0.3)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.3)' },
    config: {
      duration: 100,
      friction: 100,
      bounce: 10,
    },
  });

  return (
    <ExternalCheckbox.Root
      {...props}
      className={`border-2 w-8 h-8 ${
        props.checked ? 'border-green-500' : 'border-zinc-800'
      } ${
        props.checked ? 'bg-green-500' : 'bg-transparent'
      } rounded-md p-2} transition-all`}
      onClick={props.onClick}
    >
      <ExternalCheckbox.Indicator>
        {checkTransitions((style, item) => {
          if (item) {
            return (
              <animated.div
                style={style}
                className='flex flex-1 justify-center items-center'
              >
                <Check weight={'bold'} className={'text-white w-5 h-5'} />
              </animated.div>
            );
          }
        })}
      </ExternalCheckbox.Indicator>
    </ExternalCheckbox.Root>
  );
});
