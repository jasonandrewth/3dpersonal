import React from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

const Project: React.FC<Project> = ({ title, description, imageUrl }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={400}
        priority={true}
      />
      <div className="flex flex-col px-4 my-4 lg:my-0">
        <h3 className="uppercase font-bold mb-2">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Project;
