// src/components/Carousel/Carousel.jsx
import React, { useState } from "react";
import { useCarousel } from "../../hooks/useCarousel";
import styles from "./Carousel.module.css";

const Carousel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Use your custom hook
  const { carouselImages, addImage, updateImage, removeImage } = useCarousel();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleUrlChange = (index, value) => {
    updateImage(index, value);
  };

  return (
    <div className={styles.carouselEditor}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        Carousel Options
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownBody}>
          {carouselImages.map((url, index) => (
            <div key={index} className={styles.textAreaRow}>
              <textarea
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder="Enter a URL for an image"
                className={styles.textArea}
              />
              <button
                onClick={() => removeImage(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={() => addImage()} className={styles.addButton}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
