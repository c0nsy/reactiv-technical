// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [carouselImages, setCarouselImages] = useState([]);

  // Add these
  const [textSections, setTextSections] = useState([]);

  const [callToAction, setCallToAction] = useState({
    label: "",
    link: "",
    buttonColor: "#0000FF",
  });

  return (
    <AppContext.Provider
      value={{
        carouselImages,
        setCarouselImages,
        textSections,
        setTextSections,
        callToAction,
        setCallToAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
