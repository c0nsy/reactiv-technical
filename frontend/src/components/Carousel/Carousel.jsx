// src/components/Carousel/Carousel.jsx
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Carousel.module.css";

// A basic URL regex for demonstration
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const Carousel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Now we read/write directly to the context
  const { carouselImages, setCarouselImages } = useAppContext();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new empty string to represent a new URL
  const addImage = () => {
    setCarouselImages((prev) => [...prev, ""]);
  };

  // Delete an image by index
  const deleteImage = (index) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate and update a given URL
  const handleUrlChange = (index, newValue) => {
    // Optional: check if newValue is valid with urlRegex
    // If you want to store invalid entries as well, or blank, up to you
    setCarouselImages((prev) =>
      prev.map((url, i) => (i === index ? newValue : url))
    );
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
                onClick={() => deleteImage(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addImage} className={styles.addButton}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
