import { useState } from "react";
import styles from "./CallToAction.module.css";

const CallToAction = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ctaList, setCtaList] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Add a new CTA configuration
  const addCta = () => {
    setCtaList((prev) => [
      ...prev,
      {
        label: "",
        link: "",
        buttonColor: "#0000ff",
        labelColor: "#ffffff",
        showColorOptions: false,
      },
    ]);
  };

  // Handle changes in a CTA field (label, link, buttonColor, labelColor, etc.)
  const handleChange = (index, field, value) => {
    setCtaList((prev) =>
      prev.map((cta, i) => (i === index ? { ...cta, [field]: value } : cta))
    );
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

          <button className={styles.addButton} onClick={addCta}>
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default CallToAction;
