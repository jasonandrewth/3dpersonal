import { useState } from "react";

export type ButtonProps = {
  onClick?: (input?: any) => void;
  classes?: string;
  children: React.ReactNode;
};

const ButtonCTA: React.FC<ButtonProps> = ({ onClick, children, classes }) => {
  const [active, setActive] = useState(false);
  return (
    <button
      className={
        classes +
        " " +
        "uppercase text-sm md:text-base rounded-md border-2 font-extrabold border-white py-1 px-4 min-w-[120px] flex items-center justify-center hover:border-[#7838FF] hover:text-[#7838ff] transition-all duration-75"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonCTA;
