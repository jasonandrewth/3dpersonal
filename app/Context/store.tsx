"use client";

import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useReducer,
  ReducerAction,
  PropsWithChildren,
  FC,
  useCallback,
  useMemo,
} from "react";

export interface State {
  displayModal: boolean;
  modalView: string;
  modalState: string;
  setModalState: Dispatch<SetStateAction<string>>;
}

const initialState = {
  displayModal: false,
  modalView: "MODAL_VIEW",
  modalState: "info",
  setModalState: (): string => "",
};

type Action =
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL";
      payload: string;
    };

export const UIContext = createContext<State | any>(initialState);
UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL": {
      return {
        ...state,
        modalState: action.payload,
      };
    }
  }
}

export const UiContextProvider: FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openModal = useCallback<() => void>(
    () => dispatch({ type: "OPEN_MODAL" }),
    [dispatch]
  );
  const closeModal = useCallback<() => void>(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );

  const toggleModal = useCallback(() => {
    state.displayModal
      ? dispatch({ type: "CLOSE_MODAL" })
      : dispatch({ type: "OPEN_MODAL" });
  }, [dispatch, state.displayModal]);

  const setModalState = useCallback<(val: string) => void>(
    (val) => dispatch({ type: "SET_MODAL", payload: val }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      toggleModal,
      setModalState,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC<PropsWithChildren> = ({ children }) => (
  <UiContextProvider>{children}</UiContextProvider>
);
