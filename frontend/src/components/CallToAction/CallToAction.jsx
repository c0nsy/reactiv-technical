import { useState } from "react";
import { useCTA } from "../../hooks/useCTA";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { ctaList, addCta, updateCtaField, toggleColorOptions, deleteCta } =
    useCTA();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles.callToActionEditor}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        Call To Action Options
      </div>

      {dropdownOpen && (
        <div className={styles.dropdownBody}>
          {ctaList.map((cta, index) => (
            <div key={index} className={styles.ctaRow}>
              {/* Label + Link Inputs */}
              <div className={styles.ctaInputs}>
                <input
                  type="text"
                  placeholder="Button Label"
                  value={cta.label}
                  onChange={(e) =>
                    updateCtaField(index, "label", e.target.value)
                  }
                  className={styles.labelInput}
                  style={{ color: cta.labelColor }}
                />
                <input
                  type="text"
                  placeholder="Link (e.g., https://example.com)"
                  value={cta.link}
                  onChange={(e) =>
                    updateCtaField(index, "link", e.target.value)
                  }
                  className={styles.linkInput}
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
                  onClick={() => deleteCta(index)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>

              {/* Conditionally render color pickers */}
              {cta.showColorOptions && (
                <div className={styles.colorInputs}>
                  <div className={styles.colorFieldGroup}>
                    <label>Button Color: </label>
                    <input
                      type="color"
                      value={cta.buttonColor}
                      onChange={(e) =>
                        updateCtaField(index, "buttonColor", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.colorFieldGroup}>
                    <label>Label Color: </label>
                    <input
                      type="color"
                      value={cta.labelColor}
                      onChange={(e) =>
                        updateCtaField(index, "labelColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className={styles.addButton} onClick={addCta}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default CallToAction;
