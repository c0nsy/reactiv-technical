import { useState } from "react";
import styles from "./Carousel.module.css";

const Carousel = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [textAreas, setTextAreas] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const addTextArea = () => {
    setTextAreas((prev) => [...prev, ""]);
  };

  const handleTextChange = (index, value) => {
    setTextAreas((prev) => prev.map((text, i) => (i === index ? value : text)));
  };

  const deleteTextArea = (index) => {
    setTextAreas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.carouselEditor}>
      {/* Dropdown Header */}
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        Carousel Options
      </div>

      {/* Dropdown Body */}
      {dropdownOpen && (
        <div className={styles.dropdownBody}>
          {textAreas.map((text, index) => (
            <div key={index} className={styles.textAreaRow}>
              <textarea
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Link to image (e.g., https://example.com)"
                className={styles.textArea}
              />
              <button
                onClick={() => deleteTextArea(index)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
          <button onClick={addTextArea} className={styles.addButton}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
