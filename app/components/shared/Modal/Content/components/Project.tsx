"use client";

import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import ExternalLink from "../../../ExternalLink/ExternalLink";
import Backdrop from "../../Backdrop";

import useMedia from "@/app/utils/hooks/useMedia";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  activeLink?: string;
  hovered: boolean;
}

const Project: React.FC<Project> = ({
  title,
  description,
  imageUrl,
  activeLink,
  hovered = false,
}) => {
  const isDesktop = useMedia();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="lg:absolute top-0 left-0 lg:h-[calc(100vh-224px)]  w-full lg:overflow-hidden">
        {isDesktop ? (
          <Image
            src={imageUrl}
            alt={title}
            fill={isDesktop && true}
            // style={{
            //   objectFit: "contain",
            // }}
            priority={true}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={title}
            width={600}
            height={400}
            priority={true}
          />
        )}
      </div>

      <div
        className={clsx(
          " z-[999999] h-full w-full ",
          isDesktop
            ? hovered
              ? "bg-black bg-opacity-40 bg-blend-saturation flex items-end transition-all duration-200"
              : "opacity-0"
            : ""
        )}
      >
        <div className="flex flex-col px-4 my-4 lg:my-0 lg:mb-4  ">
          <h3 className="uppercase font-bold mb-2">{title}</h3>
          <p>{description}</p>
          {activeLink && (
            <ExternalLink
              classes="hover:text-red-500 transition-all duration-200 mt-2 uppercase"
              href={activeLink}
              ariaLabel="Grapevine"
            >
              <span>Visit</span>
            </ExternalLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
