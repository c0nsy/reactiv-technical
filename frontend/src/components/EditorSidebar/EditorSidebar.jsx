import { useState } from "react";
import Carousel from "../Carousel/Carousel";
import TextArea from "../TextArea/TextArea";
import CallToAction from "../CallToAction/CallToAction";
import { useAppContext } from "../../context/AppContext";
import styles from "./EditorSidebar.module.css";

const EditorSidebar = () => {
  const { reset, exportData, importData } = useAppContext();

  // Export modal state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportJson, setExportJson] = useState("");

  const [showImportModal, setShowImportModal] = useState(false);
  const [importJson, setImportJson] = useState("");

  const handleResetClick = () => {
    reset();
  };

  const handleImportClick = () => {
    setShowImportModal(true);
  };
  const closeImportModal = () => {
    setShowImportModal(false);
    setImportJson("");
  };
  const confirmImport = () => {
    try {
      importData(importJson);
      closeImportModal();
    } catch (error) {
      alert("Invalid JSON! Please check your input and try again.");
      console.log(error);
    }
  };

  const handleExportClick = () => {
    const dataString = exportData();
    setExportJson(dataString);
    setShowExportModal(true);
  };
  const closeExportModal = () => {
    setShowExportModal(false);
    setExportJson("");
  };

  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.heading}>Editor Sidebar</h2>

      {/* Carousel Editor */}
      <Carousel />

      {/* Text Area Editor */}
      <TextArea />

      {/* Call To Action Section */}
      <CallToAction />

      {/* Control Buttons */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={handleResetClick}
          style={{
            background: "#dc3545",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
        <button
          onClick={handleImportClick}
          style={{
            background: "#28a745",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Import
        </button>
        <button
          onClick={handleExportClick}
          style={{
            background: "#17a2b8",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          Export
        </button>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Exported JSON</h3>
            <textarea
              readOnly
              value={exportJson}
              className={styles.exportTextarea}
            />
            <button onClick={closeExportModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Import JSON</h3>
            <textarea
              placeholder="Paste your JSON here"
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              className={styles.exportTextarea}
            />
            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={confirmImport}
                style={{
                  marginRight: "0.5rem",
                  background: "#28a745",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Import
              </button>
              <button
                onClick={closeImportModal}
                style={{
                  background: "#6c757d",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;
