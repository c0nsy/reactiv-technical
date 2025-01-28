// src/hooks/useCTA.js
import { useAppContext } from "../context/AppContext";

export const useCTA = () => {
  const { ctaList, setCtaList } = useAppContext();

  const addCta = () => {
    setCtaList((prev) => [
      ...prev,
      {
        label: "",
        link: "",
        buttonColor: "#0000ff",
        labelColor: "#000000",
        showColorOptions: false,
      },
    ]);
  };

  const updateCtaField = (index, field, value) => {
    setCtaList((prev) =>
      prev.map((cta, i) => (i === index ? { ...cta, [field]: value } : cta))
    );
  };

  const toggleColorOptions = (index) => {
    setCtaList((prev) =>
      prev.map((cta, i) =>
        i === index ? { ...cta, showColorOptions: !cta.showColorOptions } : cta
      )
    );
  };

  const deleteCta = (index) => {
    setCtaList((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    ctaList,
    addCta,
    updateCtaField,
    toggleColorOptions,
    deleteCta,
  };
};
