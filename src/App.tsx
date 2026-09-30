import { Routes, Route, useLocation, HashRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TvPage } from "./pages/TvPage";
import { PageLayout } from "./components/PageLayout";
import { SettingsProvider } from "./context/SettingsContext";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/tv" element={<TvPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <HashRouter>
      <SettingsProvider>
        <PageLayout>
          <AnimatedRoutes />
        </PageLayout>
      </SettingsProvider>
    </HashRouter>
  );
}

export default App;
