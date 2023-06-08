import { PropsWithChildren, useEffect } from "react";
import { motion } from "framer-motion";

import Backdrop from "./Backdrop";
import { useUI } from "@/app/Context/store";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ children }: PropsWithChildren) => {
  const { displayModal, modalState, closeModal } = useUI();

  useEffect(() => {
    console.log("data changed", displayModal);
  }, [displayModal]);

  return (
    <>
      <Backdrop onClick={() => closeModal()}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="z-20 w-[calc(100vw-80px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-320px)] h-[calc(100vh-224px)] max-w-5xl rounded-lg border-2 border-white m-auto overflow-scroll flex flex-col items-center"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* <h1>{modalState}</h1> */}
          {children}
        </motion.div>
      </Backdrop>
    </>
  );
};

export default Modal;
