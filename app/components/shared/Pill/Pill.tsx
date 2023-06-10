import React, { PropsWithChildren } from "react";

const Pill = ({ children }: PropsWithChildren) => {
  return (
    <div className="border border-solid border-white rounded-full py-1 px-3 flex justify-center align-middle max-w-[200px]">
      <span className="text-sm">{children}</span>
    </div>
  );
};

export default Pill;
