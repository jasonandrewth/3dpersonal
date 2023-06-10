"use client";

import { motion } from "framer-motion";

import { useState, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperRef, SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { fade } from "./Info";

const Work = () => {
  const swiperRef = useRef<any>();

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="px-4"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">Work</h1>

      <div className="relative flex w-full">
        <Swiper
          // spaceBetween={50}
          className="w-full relative"
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop={false}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper>
      </div>
    </motion.div>
  );
};

export default Work;
