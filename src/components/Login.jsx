import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Logins.css";

function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim() !== "") {
      localStorage.setItem("username", name);
      navigate("/classify");
    } else {
      alert("Por favor, ingresa tu nombre.");
    }
  };

  return (
    <div className="login-container">
      <h1>Bienvenido</h1>
      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Comenzar</button>
    </div>
  );
}

export default Login;