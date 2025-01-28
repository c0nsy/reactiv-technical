// src/hooks/useTextSections.js
import { useAppContext } from "../context/AppContext";

export const useTextSections = () => {
  const { textSections, setTextSections } = useAppContext();

  const addSection = () => {
    setTextSections((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        titleColor: "#000000",
        descriptionColor: "#000000",
        showColorOptions: false,
      },
    ]);
  };

  const updateSectionField = (index, field, value) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  const toggleColorOptions = (index) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? { ...section, showColorOptions: !section.showColorOptions }
          : section
      )
    );
  };

  const deleteSection = (index) => {
    setTextSections((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    textSections,
    addSection,
    updateSectionField,
    toggleColorOptions,
    deleteSection,
  };
};
