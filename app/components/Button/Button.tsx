import { useState } from "react";
import clsx from "clsx";
export type ButtonProps = {
  onClick?: (input?: any) => void;
  classes?: string;
  children: React.ReactNode;
  active: boolean;
};

const ButtonCTA: React.FC<ButtonProps> = ({
  onClick,
  children,
  active = false,
  classes,
}) => {
  return (
    <button
      className={
        classes +
        " " +
        clsx(
          "uppercase text-sm md:text-base rounded-md border-2 font-extrabold border-black py-1 px-4 min-w-[120px] flex items-center justify-center hover:border-myblue hover:text-myblue transition-all duration-300",
          active && "border-white text-white"
        )
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonCTA;
