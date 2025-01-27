// import React from "react";
import styles from "./EditorSidebar.module.css";

const EditorSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Editor Sections</h2>
      <ul>
        <li>Carousel</li>
        <li>Text Area</li>
        <li>Call to Action Button</li>
      </ul>
    </div>
  );
};

export default EditorSidebar;
