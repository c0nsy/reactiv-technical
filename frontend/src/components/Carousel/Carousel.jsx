import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./Carousel.module.css";

// A basic URL regex
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const Carousel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Local state for user-typed URLs, each item = { value: string, isValid: boolean }
  const [textAreas, setTextAreas] = useState([]);

  // Pull in global context so we can set the array of valid carousel images
  const { setCarouselImages } = useAppContext();

  // Toggles the dropdown for the carousel
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new text area
  const addTextArea = () => {
    setTextAreas((prev) => [...prev, { value: "", isValid: true }]);
  };

  // Delete a text area
  const deleteTextArea = (index) => {
    setTextAreas((prev) => prev.filter((_, i) => i !== index));
  };

  // Validate and handle text change
  const handleTextChange = (index, newValue) => {
    const isValid = urlRegex.test(newValue.trim());
    setTextAreas((prev) =>
      prev.map((item, i) => (i === index ? { value: newValue, isValid } : item))
    );
  };

  // If any text area is invalid, disable the plus button
  const anyInvalid = textAreas.some((item) => !item.isValid);

  // Whenever `textAreas` changes, update the global context with only valid URLs
  useEffect(() => {
    const validUrls = textAreas
      .filter((item) => item.isValid && item.value.trim() !== "")
      .map((item) => item.value.trim());

    // Update the global carouselImages array with the valid ones
    setCarouselImages(validUrls);
  }, [textAreas, setCarouselImages]);

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
