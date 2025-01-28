// src/hooks/useCarousel.js
import { useAppContext } from "../context/AppContext";

export const useCarousel = () => {
  // Access the context
  const { carouselImages, setCarouselImages } = useAppContext();

  // Add a new blank image or a passed URL
  const addImage = (url = "") => {
    setCarouselImages((prev) => [...prev, url]);
  };

  // Update an existing image at index
  const updateImage = (index, newUrl) => {
    setCarouselImages((prev) =>
      prev.map((item, i) => (i === index ? newUrl : item))
    );
  };

  // Remove an image at index
  const removeImage = (index) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    carouselImages, // data
    addImage,
    updateImage,
    removeImage,
  };
};
