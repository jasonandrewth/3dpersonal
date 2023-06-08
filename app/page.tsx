"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Nav from "./components/shared/Nav";
import Modal from "./components/shared/Modal";

//Content
import { Info, Lab, Work } from "./components/shared/Modal/Content";

//Context
import { useUI } from "./Context/store";

export default function Home() {
  const { closeModal, displayModal, modalState } = useUI();

  const modalContent = () => {
    switch (modalState) {
      case "info": {
        return <Info />;
      }
      case "work": {
        return <Work />;
      }
      case "lab": {
        return <Lab />;
      }
    }
  };

  return (
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      // exitBeforeEnter={true}
      mode="wait"
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => null}
    >
      <Nav />
      {displayModal && (
        <Modal>
          <div className="mt-8 px-4 mx-auto">{modalContent()}</div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
