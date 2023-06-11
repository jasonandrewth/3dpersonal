"use client";

import { motion } from "framer-motion";

import { useState, useRef } from "react";
import Project from "./components/Project";
// Import Swiper React components
import { Swiper, SwiperSlide, SwiperRef, SwiperProps } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { fade } from "./Info";

const Work = () => {
  const swiperRef = useRef<any>();

  return (
    <motion.div
      className="lg:px-4"
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-center uppercase font-bold text-lg pb-2">Work</h1>

      <div className=" flex w-full h-full">
        <Swiper
          // spaceBetween={50}
          className="w-full relative"
          onBeforeInit={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          loop={false}
        >
          <SwiperSlide key={1}>
            <Project />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <Project />
          </SwiperSlide>
          <SwiperSlide key={3}>
            <Project />
          </SwiperSlide>
          <SwiperSlide key={4}>
            <Project />
          </SwiperSlide>
        </Swiper>

        <>
          <button
            className="fixed z-50 left-4 top-1/2 -translate-y-1/2"
            onClick={() => swiperRef?.current?.slidePrev()}
          >
            {"<-"}
          </button>

          <button
            className="fixed z-50 right-4 top-1/2 -translate-y-1/2"
            onClick={() => swiperRef?.current?.slideNext()}
          >
            {"->"}
          </button>
        </>
      </div>
    </motion.div>
  );
};

export default Work;
