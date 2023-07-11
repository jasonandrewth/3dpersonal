import { motion } from "framer-motion";

import useMedia from "@/app/utils/hooks/useMedia";

import Logo from "@/app/components/Icons/Logo";
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
  const isDesktop = useMedia();
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative w-full h-full mt-8 mx-auto px-4"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">info</h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-center lg:text-left">
          Jason Thompson is a developer and designer based in Berlin creating
          future-oriented web experiences with a strong emphasis on visual
          identity.
        </p>

        {/* <ul className="flex mt-4 gap-2">
          <li>GH</li>
          <li>TW</li>
        </ul> */}

        <h2 className="mt-4 mb-4 font-medium">Tech:</h2>

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
            <Pill>postgresql</Pill>
          </li>
        </ul>

        {isDesktop && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500">
            <Logo />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Info;
