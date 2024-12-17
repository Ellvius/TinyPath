import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Shorten from "./components/Shorten";
import Details from "./components/Details";
import TopUrls from "./components/TopUrls";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-secondary">
      {location.pathname !== "/" && <Navbar />}
      {(location.pathname !== "/details" && location.pathname !== "/topurls") && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shorten" element={<Shorten />} />
          <Route path="/details" element={<Details />} />
          <Route path="/topurls" element={<TopUrls />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
