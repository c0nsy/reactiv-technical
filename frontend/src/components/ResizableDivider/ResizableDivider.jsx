import { useState } from "react";
import styles from "./ResizableDivider.module.css";

const ResizableDivider = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(30); // Width as a percentage

  const handleMouseDown = (e) => {
    e.preventDefault();

    const handleMouseMove = (moveEvent) => {
      const newWidth = (moveEvent.clientX / window.innerWidth) * 100;
      setSidebarWidth(Math.min(Math.max(newWidth, 10), 70));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar} style={{ width: `${sidebarWidth}%` }}>
        {children[0]} {/* Left Panel */}
      </div>
      <div
        className={styles.divider}
        onMouseDown={handleMouseDown}
        title="Drag to resize"
      />
      <div
        className={styles.preview}
        style={{ width: `${100 - sidebarWidth}%` }}
      >
        {children[1]} {/* Right Panel */}
      </div>
    </div>
  );
};

export default ResizableDivider;
