import { motion } from "framer-motion";

import { fade } from "./Info";

import Logo from "@/app/components/Icons/Logo";

const Work = () => {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full h-full mt-8 mx-auto px-4"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">Lab</h1>

      <div className="text-2xl text-center">COMING SOON !</div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500">
        <Logo />
      </div>
    </motion.div>
  );
};

export default Work;
