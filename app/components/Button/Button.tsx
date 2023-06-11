import { useState } from "react";
import clsx from "clsx";
export type ButtonProps = {
  onClick?: (input?: any) => void;
  classes?: string;
  children: React.ReactNode;
  active?: boolean;
  contrast: boolean;
};

const ButtonCTA: React.FC<ButtonProps> = ({
  onClick,
  children,
  active = false,
  contrast = false,
  classes,
}) => {
  const buttonActive = active && contrast;
  const buttonContrast = !active && contrast;
  return (
    <button
      className={
        classes +
        " " +
        clsx(
          "uppercase text-sm md:text-base rounded-md border-2 font-extrabold border-black py-1 px-4 min-w-[120px] flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-all duration-300",
          buttonContrast && !active && "border-white text-white",
          buttonActive && "border-p border-red-500 text-red-500"
        )
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonCTA;
