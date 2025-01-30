import { createContext, useContext, useState } from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [textSections, setTextSections] = useState([]);
  const [ctaList, setCtaList] = useState([]);

  // Reset all data
  const reset = () => {
    setCarouselImages([]);
    setTextSections([]);
    setCtaList([]);
  };

  // Export all data as JSON
  const exportData = () => {
    const exportObj = {
      carouselImages,
      textSections,
      ctaList,
    };

    return JSON.stringify(exportObj, null, 2);
  };

  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);

      // First reset existing data
      reset();

      // Overwrite arrays with what's in parsed if present
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
      // Re-throw so it can be caught in the UI (e.g., show an alert)
      throw error;
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
