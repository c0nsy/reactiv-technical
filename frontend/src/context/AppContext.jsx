import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [textSections, setTextSections] = useState([]);
  const [ctaList, setCtaList] = useState([]);

  const reset = () => {
    setCarouselImages([]);
    setTextSections([]);
    setCtaList([]);
  };

  const exportData = () => {
    const exportObj = {
      carouselImages,
      textSections,
      ctaList,
    };
    return JSON.stringify(exportObj, null, 2);
  };

  // We'll parse the JSON and overwrite each array
  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);

      // Example structure:
      // {
      //   "carouselImages": [...],
      //   "textSections": [...],
      //   "ctaList": [...]
      // }

      // First, reset existing data
      reset();

      // Then overwrite with what's in parsed
      if (parsed.carouselImages) {
        setCarouselImages(parsed.carouselImages);
      }
      if (parsed.textSections) {
        setTextSections(parsed.textSections);
      }
      if (parsed.ctaList) {
        setCtaList(parsed.ctaList);
      }
    } catch (error) {
      console.error("Invalid JSON for importData:", error);
      throw error; // re-throw so we can catch it in the UI
    }
  };

  return (
    <AppContext.Provider
      value={{
        carouselImages,
        setCarouselImages,
        textSections,
        setTextSections,
        ctaList,
        setCtaList,
        reset,
        exportData,
        importData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
