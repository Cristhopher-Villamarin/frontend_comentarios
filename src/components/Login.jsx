import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Logins.css";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // Estado para el mensaje de error
  const navigate = useNavigate();

  // Función para validar el correo electrónico con una expresión regular
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setError("Por favor, ingresa tu correo.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    // Si pasa la validación, guardar y redirigir
    setError(""); // Limpiar error si todo está bien
    localStorage.setItem("username", email);
    navigate("/classify");
  };

  return (
    <div className="login-container">
      <h1>Bienvenido</h1>
      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={error ? "input-error" : ""}
      />
      {error && <p className="error-message">{error}</p>} {/* Mostrar error si existe */}
      <button onClick={handleSubmit}>Comenzar</button>
    </div>
  );
}

export default Login;
