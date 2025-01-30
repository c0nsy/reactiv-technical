import { useState } from "react";
import { useTextSections } from "../../hooks/useTextSections";
import styles from "./TextArea.module.css";

const TextArea = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    textSections,
    addSection,
    updateSectionField,
    toggleColorOptions,
    deleteSection,
  } = useTextSections();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
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
                  onChange={(e) =>
                    updateSectionField(index, "title", e.target.value)
                  }
                  style={{ color: section.titleColor }}
                  className={styles.titleInput}
                />
                <textarea
                  placeholder="Description"
                  value={section.description}
                  onChange={(e) =>
                    updateSectionField(index, "description", e.target.value)
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

              {section.showColorOptions && (
                <div className={styles.colorInputs}>
                  <label>Title Color: </label>
                  <input
                    type="color"
                    value={section.titleColor}
                    onChange={(e) =>
                      updateSectionField(index, "titleColor", e.target.value)
                    }
                  />
                  <label>Description Color: </label>
                  <input
                    type="color"
                    value={section.descriptionColor}
                    onChange={(e) =>
                      updateSectionField(
                        index,
                        "descriptionColor",
                        e.target.value
                      )
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
