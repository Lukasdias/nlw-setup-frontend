import { Check, Plus } from 'phosphor-react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: 'check' | 'plus';
  variant: 'green' | 'violet';
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  const Icon = props.icon ? Check : Plus;
  const color = props.variant === 'green' ? 'green-600' : 'violet-500';
  return (
    <button
      {...props}
      type={'button'}
      className={`p-4 rounded-lg ${
        props.variant !== 'green' ? 'bg-transparent' : 'bg-green-600'
      } border-2 ${
        props.variant !== 'green' ? 'border-violet-500' : 'border-green-600'
      } transition-colors duration-200 flex justify-center items-center group ${
        props.variant !== 'green' ? 'hover:bg-violet-500' : 'hover:bg-green-800'
      } hover:text-white gap-3
        ${
          props.variant !== 'green'
            ? 'focus:border-violet-500'
            : 'focus:border-green-600'
        }
          outline-none focus:outline-none focus:ring-2 ${
            props.variant !== 'green'
              ? 'focus:ring-violet-600'
              : 'focus:ring-green-600'
          } focus:ring-opacity-50
          transition-colors duration-200
        `}
    >
      <Icon
        weight={'bold'}
        className={`w-5 h-5 ${
          props.variant !== 'green' ? 'text-violet-500' : 'text-white'
        } group-hover:text-white transition-colors duration-200`}
      />
      <span className={'text-white font-semibold'}>{props.children}</span>
    </button>
  );
};
