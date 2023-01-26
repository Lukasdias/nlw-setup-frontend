import clsx from "clsx";
import { Check, Plus } from "phosphor-react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: "check" | "plus";
  variant: "green" | "violet";
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  const Icon = props.icon === "check" ? Check : Plus;
  const color = props.variant === "green" ? "green-600" : "violet-500";
  console.log;

  const variant = clsx(props.variant, {
    "bg-transparent border-violet-500 hover:bg-violet-500 focus:border-violet-500 focus:ring-violet-600":
      props.variant !== "green",
    "bg-green-600 border-green-600 hover:bg-green-800 focus:border-green-600 focus:ring-green-600":
      props.variant === "green",
  });

  const textVariant = clsx(props.variant, {
    "text-violet-500": props.variant !== "green",
    "text-white": props.variant === "green",
  });

  return (
    <button
      {...props}
      type={"button"}
      className={`${variant} ${props.className} group flex items-center justify-center gap-2 rounded-lg border-2  p-4 outline-none transition-colors  duration-200 hover:text-white
      focus:outline-none focus:ring-2 focus:ring-opacity-50  lg:gap-3`}
    >
      <Icon
        weight={"bold"}
        className={`h-6 w-6 ${textVariant} transition-colors duration-200 group-hover:text-white`}
      />
      <span className={"font-semibold text-white md:text-base"}>
        {props.children}
      </span>
    </button>
  );
};
