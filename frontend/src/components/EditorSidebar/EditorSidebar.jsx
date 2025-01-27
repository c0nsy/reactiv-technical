// import React from "react";
import Carousel from "../Carousel/Carousel";
import TextArea from "../TextArea/TextArea";
import styles from "./EditorSidebar.module.css";

const EditorSidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.heading}>Editor Sidebar</h2>

      {/* Carousel Editor */}
      <Carousel />

      {/* Text Area Editor */}
      <TextArea />

      {/* Future CTA Section Placeholder */}
      <div className={styles.otherSection}>
        <h3>Call to Action Section (placeholder)</h3>
        {/* CTA logic goes here */}
      </div>
    </div>
  );
};

export default EditorSidebar;
