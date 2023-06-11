import { motion } from "framer-motion";

import Pill from "../../Pill";

export const fade = {
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
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="px-4"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">info</h1>

      <div className="max-w-4xl mx-auto">
        <p>
          Jason Thompson is a developer and designer focusing on future-oriented
          web experiences with the aim to create solutions with a strong
          emphasis on visual identity.
        </p>

        <h2 className="mt-4 mb-4 font-medium">Tech I Like To Use:</h2>

        <ul className="flex gap-2 flex-wrap">
          <li>
            <Pill>React</Pill>
          </li>
          <li>
            <Pill>Svelte</Pill>
          </li>
          <li>
            <Pill>THREE.JS</Pill>
          </li>
          <li>
            <Pill>GLSL</Pill>
          </li>
          <li>
            <Pill>Typescript</Pill>
          </li>
          <li>
            <Pill>Node.js</Pill>
          </li>
          <li>
            <Pill>Figma</Pill>
          </li>
          <li>
            <Pill>Arduino</Pill>
          </li>
          <li>
            <Pill>Prisma</Pill>
          </li>
          <li>
            <Pill>Webpack</Pill>
          </li>
          <li>
            <Pill>postgresql</Pill>
          </li>
          <li>
            <Pill>Raspberry Pi</Pill>
          </li>
          <li>
            <Pill>SymPy</Pill>
          </li>
          <li>
            <Pill>Jupyter notebook</Pill>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Info;
