import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { PageLayout } from "./components/PageLayout";

function App() {
  return (
    <HashRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </PageLayout>
    </HashRouter>
  );
}

export default App;
