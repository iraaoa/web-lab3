import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Chronology from "./pages/Chronology"; 
import Quiz from "./pages/Quiz";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/chronology" element={<Chronology />} /> 
        <Route path="/quiz" element={<Quiz />} /> 

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
