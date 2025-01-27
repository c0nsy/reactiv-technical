import { useState } from "react";
import styles from "./CallToAction.module.css";

// Basic URL regex to validate the link
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;

const CallToAction = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Each CTA item now also contains isValid to track if the link is valid
  const [ctaList, setCtaList] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new CTA configuration, default link is valid if empty, or you can set it to false
  const addCta = () => {
    setCtaList((prev) => [
      ...prev,
      {
        label: "",
        link: "",
        buttonColor: "#0000ff",
        labelColor: "#000000", // default is black
        showColorOptions: false,
        isValid: true,
      },
    ]);
  };

  // Validate link using urlRegex
  const validateLink = (value) => {
    // If you want to allow empty strings or partial, adjust logic
    if (!value.trim()) return true; // treat empty as valid or false if you want to force a link
    return urlRegex.test(value.trim());
  };

  // Handle changes in a CTA field (label, link, buttonColor, labelColor, etc.)
  const handleChange = (index, field, value) => {
    setCtaList((prev) => {
      return prev.map((cta, i) => {
        if (i === index) {
          let updatedCta = { ...cta, [field]: value };
          // If the user is editing the link, validate it
          if (field === "link") {
            const valid = validateLink(value);
            updatedCta.isValid = valid;
          }
          return updatedCta;
        }
        return cta;
      });
    });
  };

  // Toggle color pickers for the CTA
  const toggleColorOptions = (index) => {
    setCtaList((prev) =>
      prev.map((cta, i) =>
        i === index ? { ...cta, showColorOptions: !cta.showColorOptions } : cta
      )
    );
  };

  // Remove a CTA item
  const deleteCta = (index) => {
    setCtaList((prev) => prev.filter((_, i) => i !== index));
  };

  // If any CTA has an invalid link, disable the add button
  const anyInvalid = ctaList.some((cta) => !cta.isValid);

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
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                  className={styles.labelInput}
                  style={{ color: cta.labelColor }}
                />
                <input
                  type="text"
                  placeholder="Link (e.g., https://example.com)"
                  value={cta.link}
                  onChange={(e) => handleChange(index, "link", e.target.value)}
                  className={
                    cta.isValid
                      ? styles.linkInput
                      : `${styles.linkInput} ${styles.invalid}`
                  }
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
                        handleChange(index, "buttonColor", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.colorFieldGroup}>
                    <label>Label Color: </label>
                    <input
                      type="color"
                      value={cta.labelColor}
                      onChange={(e) =>
                        handleChange(index, "labelColor", e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            className={styles.addButton}
            onClick={addCta}
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

export default CallToAction;
