import React from "react";
import Image from "next/image";

const Project = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <Image
        src={"/images/ditto.png"}
        alt="Ditto"
        width={500}
        height={400}
        priority={true}
      />
      <div className="flex flex-col px-4 my-4 lg:my-0">
        <h3 className="uppercase font-bold mb-2">PROJECT TITLE</h3>
        <p>
          Project Description: Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Deleniti eum illo libero totam iste culpa, aperiam
          deserunt placeat cum adipisci repellendus fugiat temporibus.
          Reprehenderit placeat eum, mollitia ducimus excepturi nulla.
        </p>
      </div>
    </div>
  );
};

export default Project;
