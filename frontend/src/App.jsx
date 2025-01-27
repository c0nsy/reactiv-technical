// import React from "react";
import EditorSidebar from "./components/EditorSidebar/EditorSidebar";
import MobilePreview from "./components/MobilePreview/MobilePreview";
import ResizableDivider from "./components/ResizableDivider/ResizableDivider";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <ResizableDivider>
        <EditorSidebar />
        <MobilePreview />
      </ResizableDivider>
    </AppProvider>
  );
};

export default App;
