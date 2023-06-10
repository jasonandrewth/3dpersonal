import { PropsWithChildren } from "react";

import { motion } from "framer-motion";

export type BackdropProps = {
  onClick?: (input?: any) => void;
  children?: React.ReactNode;
};

const Backdrop: React.FC<BackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="fixed top-0 left-0 bottom-0 z-10 w-screen h-screen cursor-pointer bg-black bg-opacity-60 bg-blend-saturation opacity-50 flex justify-center items-center overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children && children}
    </motion.div>
  );
};

export default Backdrop;
