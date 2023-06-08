import { motion } from "framer-motion";

const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Info = () => {
  return (
    <motion.div variants={fade} initial="hidden" animate="visible" exit="exit">
      <h1 className="text-center uppercase font-bold text-lg pb-2">Info</h1>

      <p>
        Info here Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
        nam repellendus optio nesciunt illum incidunt ad ut debitis excepturi
        alias amet quisquam fugit ullam placeat nostrum neque ipsa, dignissimos
        veritatis.
      </p>
    </motion.div>
  );
};

export default Info;
