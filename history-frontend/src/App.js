import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Chronology from "./pages/Chronology";
import Quiz from "./pages/Quiz";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/web-lab3" element={<Home />} />
        <Route path="/web-lab3/events" element={<Events />} />
        <Route path="/web-lab3/chronology" element={<Chronology />} />
        <Route path="/web-lab3/quiz" element={<Quiz />} />
        <Route path="/web-lab3/register" element={<Register />} />
        <Route path="/web-lab3/login" element={<Login />} />
        <Route path="/web-lab3/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
