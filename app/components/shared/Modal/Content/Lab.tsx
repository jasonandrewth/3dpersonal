import { motion } from "framer-motion";

import { fade } from "./Info";

const Work = () => {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="px-4"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">Lab</h1>

      <div className="text-2xl text-center">COMING SOON !</div>
    </motion.div>
  );
};

export default Work;
