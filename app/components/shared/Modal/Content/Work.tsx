"use client";

import { motion } from "framer-motion";

import { useState, useRef } from "react";
import Project from "./components/Project";
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperRef, SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { fade } from "./Info";

//PROJECTS
const projects = [
  {
    title: "Ditto Nation",
    image: "/images/ditto.png",
    description:
      "Headless E-Commerce and Community platform for Ditto Nation. Included developing and  deploying a custom Node.js server to update the website with live data from the clients Discord.",
    activeLink: "https://www.ditto-nation.com/",
  },
  {
    image: "/images/little-portland.png",
    title: "Little Portland",
    description:
      "Landing Page for a venue, with interactive custom svg animations and a 3D scene.",
    activeLink: "https://www.little-portland.com/",
  },
];

const Work = () => {
  const [isHovered, setIsHovered] = useState(false);

  const swiperRef = useRef<any>();

  return (
    <motion.div
      // className="lg:px-4"
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className=" text-center uppercase font-bold text-lg pb-2">Work</h1>

      <div
        className="relative lg:absolute top-0 left-0 h-full w-full flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          // spaceBetween={50}
          className="w-full h-full relative"
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop={false}
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx} className="w-full h-full">
              <Project
                title={project.title}
                imageUrl={project.image}
                description={project.description}
                activeLink={project.activeLink}
                hovered={isHovered}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {isHovered && (
          <>
            <button
              className="fixed z-50 left-4 bottom-1/2 -translate-y-1/2"
              onClick={() => swiperRef?.current?.slidePrev()}
            >
              {"<-"}
            </button>

            <button
              className="fixed z-50 right-4 bottom-1/2 -translate-y-1/2 "
              onClick={() => swiperRef?.current?.slideNext()}
            >
              {"->"}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Work;
