// src/components/TextArea/TextArea.jsx
import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import styles from "./TextArea.module.css";

const TextArea = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Now we use the global textSections array from context
  const { textSections, setTextSections } = useAppContext();

  // Toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new text section
  const addSection = () => {
    const newSection = {
      title: "",
      description: "",
      titleColor: "#000000",
      descriptionColor: "#000000",
      showColorOptions: false, // if you want the color pickers to be collapsible
    };

    setTextSections((prev) => [...prev, newSection]);
  };

  // Handle field changes (title, description, or colors)
  const handleChange = (index, field, value) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
  };

  // Toggle color pickers
  const toggleColorOptions = (index) => {
    setTextSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? { ...section, showColorOptions: !section.showColorOptions }
          : section
      )
    );
  };

  // Delete a text section
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

              {/* Conditionally render color inputs */}
              {section.showColorOptions && (
                <div className={styles.colorInputs}>
                  <label>Title Color: </label>
                  <input
                    type="color"
                    value={section.titleColor}
                    onChange={(e) =>
                      handleChange(index, "titleColor", e.target.value)
                    }
                  />
                  <label>Description Color: </label>
                  <input
                    type="color"
                    value={section.descriptionColor}
                    onChange={(e) =>
                      handleChange(index, "descriptionColor", e.target.value)
                    }
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
