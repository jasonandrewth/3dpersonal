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
      <Backdrop onClick={() => closeModal()} />
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-default overflow-scroll no-scrollbar z-20 w-[calc(100vw-80px)] md:w-[calc(100vw-200px)] lg:w-[calc(100vw-320px)] h-[calc(100vh-224px)] max-w-[75vw] rounded-lg border-2 border-white m-auto flex flex-col"
        // variants={dropIn}
        // initial="hidden"
        // animate="visible"
        // exit="exit"
      >
        {/* <button
          className="absolute cursor-pointer top-4 right-4 uppercase"
          onClick={() => closeModal()}
        >
          close
        </button> */}
        {/* <h1>{modalState}</h1> */}
        {children}
      </div>
    </>
  );
};

export default Modal;
