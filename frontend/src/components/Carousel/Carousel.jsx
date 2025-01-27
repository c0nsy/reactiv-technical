import React, { useState } from "react";
import styles from "./Carousel.module.css";

// A basic URL regex for demonstration
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const Carousel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Each item has { value: string, isValid: boolean }
  const [textAreas, setTextAreas] = useState([]);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Validate URL
  const validateUrl = (url) => {
    // Trim and test against regex
    return urlRegex.test(url.trim());
  };

  // Add a new text area
  const addTextArea = () => {
    setTextAreas((prev) => [
      ...prev,
      { value: "", isValid: true }, // default to true until the user enters something
    ]);
  };

  // Delete a text area
  const deleteTextArea = (index) => {
    setTextAreas((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle text change
  const handleTextChange = (index, newValue) => {
    // If you'd like empty strings to NOT be red, handle that logic here:
    // For example, if empty strings are allowed, you could do:
    // const isValid = !newValue.trim() || validateUrl(newValue);
    // But if you always want a valid URL or else it's red, do:
    const isValid = validateUrl(newValue);

    setTextAreas((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, value: newValue, isValid } : item
      )
    );
  };

  // If any text area is invalid, disable the add button
  const anyInvalid = textAreas.some((item) => !item.isValid);

  return (
    <div className={styles.carouselEditor}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        Carousel Options
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownBody}>
          {textAreas.map((item, index) => (
            <div key={index} className={styles.textAreaRow}>
              <textarea
                value={item.value}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Enter a URL for an image"
                // Apply the 'invalid' class if NOT valid
                className={
                  item.isValid
                    ? styles.textArea
                    : `${styles.textArea} ${styles.invalid}`
                }
              />
              <button
                onClick={() => deleteTextArea(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={addTextArea}
            className={styles.addButton}
            disabled={anyInvalid}
            style={{
              opacity: anyInvalid ? 0.6 : 1,
              cursor: anyInvalid ? "not-allowed" : "pointer",
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
