// import React from "react";
import styles from "./MobilePreview.module.css";

const MobilePreview = () => {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.phone}>
        <h2>Mobile App Preview</h2>
        <p>(Content will update in real time)</p>
      </div>
    </div>
  );
};

export default MobilePreview;
