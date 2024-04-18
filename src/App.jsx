import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registro from "./Registro";
import Login from "./Login";
import Calificaciones from "./Calificaciones";
import Reprobados from "./Reprobados";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/reprobados" element={<Reprobados />} />
      </Routes>
    </Router>
  );
}

export default App;
