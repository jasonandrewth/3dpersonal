import React, { useState } from "react";

//Context
import { useUI } from "@/app/Context/store";

import ButtonCTA from "../Button/Button";

const Nav = () => {
  const { modalState, displayModal, openModal, toggleModal, setModalState } =
    useUI();

  const onClick = (e: React.MouseEvent<HTMLElement>, modalType: string) => {
    console.log("click");
    setModalState(modalType);

    if (modalState === modalType || !displayModal) {
      toggleModal();
    }
    console.log("modal state:", modalState);
  };

  return (
    <>
      <ButtonCTA
        classes="fixed top-4 left-4 lg:top-10 lg:left-10 2xl:top-20 2xl:left-20 z-50"
        onClick={(e) => {
          onClick(e, "info");
        }}
      >
        info
      </ButtonCTA>
      <ButtonCTA classes="fixed top-4 right-4 lg:top-10 lg:right-10 2xl:top-20 2xl:right-20 z-50">
        contact
      </ButtonCTA>

      <ButtonCTA
        classes="fixed bottom-4 left-4 lg:bottom-10 lg:left-10 2xl:bottom-20 2xl:left-20 z-50"
        onClick={(e) => {
          onClick(e, "work");
        }}
      >
        work
      </ButtonCTA>
      <ButtonCTA
        classes="fixed bottom-4 right-4 lg:bottom-10 lg:right-10  2xl:bottom-20 2xl:right-20 z-50"
        onClick={(e) => {
          onClick(e, "lab");
        }}
      >
        lab
      </ButtonCTA>
    </>
  );
};

export default Nav;
