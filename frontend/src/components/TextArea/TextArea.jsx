import { useState } from "react";
import styles from "./TextArea.module.css";

const TextArea = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Each item has: title, description, titleColor, descriptionColor, and a flag to show/hide color inputs
  const [textSections, setTextSections] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new text section with default colors and hidden color options
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

  // Handle changes in any field (title, description, titleColor, descriptionColor, etc.)
  const handleChange = (index, field, value) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  // Toggle visibility of the color inputs
  const toggleColorOptions = (index) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? { ...section, showColorOptions: !section.showColorOptions }
          : section
      )
    );
  };

  // Remove a text section
  const deleteSection = (index) => {
    setTextSections((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.textAreaEditor}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        Text Area Options
      </div>
      {dropdownOpen && (
        <div className={styles.dropdownBody}>
          {textSections.map((section, index) => (
            <div key={index} className={styles.sectionRow}>
              {/* Title + Description Inputs */}
              <div className={styles.sectionInputs}>
                <input
                  type="text"
                  placeholder="Title"
                  value={section.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  style={{ color: section.titleColor }}
                  className={styles.titleInput}
                />
                <textarea
                  placeholder="Description"
                  value={section.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  style={{ color: section.descriptionColor }}
                  className={styles.descriptionInput}
                />
              </div>

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => toggleColorOptions(index)}
                  className={styles.colorButton}
                >
                  Color
                </button>
                <button
                  onClick={() => deleteSection(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>

              {/* Conditionally render color pickers */}
              {section.showColorOptions && (
                <div className={styles.colorInputs}>
                  <label>Title Color: </label>
                  <input
                    type="color"
                    value={section.titleColor}
                    onChange={(e) =>
                      handleChange(index, "titleColor", e.target.value)
                    }
                    className={styles.colorField}
                  />
                  <label>Description Color: </label>
                  <input
                    type="color"
                    value={section.descriptionColor}
                    onChange={(e) =>
                      handleChange(index, "descriptionColor", e.target.value)
                    }
                    className={styles.colorField}
                  />
                </div>
              )}
            </div>
          ))}

          <button className={styles.addButton} onClick={addSection}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default TextArea;
