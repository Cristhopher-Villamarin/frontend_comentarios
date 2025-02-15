import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Classify from "./components/Classify";
import "./App.css";

function App() {
  return (
    <div className="page-container">
      {/* Sección Superior: Título grande */}
      <header className="main-title">
        <h1>Impacto de la Publicación de Logros Académicos en Redes Sociales en la Salud Mental de Estudiantes Universitarios</h1>
      </header>

      <div className="instr-container" >
      <h2>Este cuestionario tiene la finalidad de evaluar el Impacto de la Publicación de Logros Académicos en Redes Sociales en la Salud Mental de Estudiantes Universitarios</h2>
      </div>
      {/* Rutas */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/classify" element={<Classify />} />
        </Routes>
      </Router>

      <div className="instr-container" >
      <h2>Tus datos serán tratados con absoluta confidencialidad.</h2>
      </div>
    </div>
  );
}

export default App;
