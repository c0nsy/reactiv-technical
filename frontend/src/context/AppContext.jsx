import { createContext, useContext, useState } from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [textArea, setTextArea] = useState({
    title: "",
    description: "",
    titleColor: "#000000",
    descriptionColor: "#000000",
  });
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
        textArea,
        setTextArea,
        callToAction,
        setCallToAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
