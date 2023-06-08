"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Nav from "./components/shared/Nav";
import Modal from "./components/shared/Modal";

//Context
import { useUI } from "./Context/store";

export default function Home() {
  const { closeModal, displayModal, modalState } = useUI();

  const modalContent = () => {
    switch (modalState) {
      case "info": {
        return <h1>"Info"</h1>;
      }
      case "work": {
        return <h1>"Work"</h1>;
      }
      case "lab": {
        return <h1>"Lab"</h1>;
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
      {displayModal && <Modal>{modalContent()}</Modal>}
    </AnimatePresence>
  );
}
