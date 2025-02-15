import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Classify.css";
import Thanks from "./Thanks"; // Importa el componente Thanks

const API_URL = "https://clasificadorcomentarios-production.up.railway.app/api";

function Classify() {
  const [comments, setComments] = useState([]);
  // Almacenamos la opción seleccionada (string) para cada comentario.
  const [classifications, setClassifications] = useState({});
  // Estado para controlar si ya se envió la clasificación.
  const [submitted, setSubmitted] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      window.location.href = "/";
    }
    axios
      .get(`${API_URL}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) =>
        console.error("Error al obtener comentarios", error)
      );
  }, [username]);

  // Maneja el cambio en el radio button: se almacena el valor seleccionado.
  const handleRadioChange = (commentId, value) => {
    setClassifications((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validar que todos los comentarios tengan clasificación asignada.
    const incomplete = comments.filter((comment) => !classifications[comment.id]);
    if (incomplete.length > 0) {
      alert("Por favor, complete la clasificación de todos los comentarios.");
      return;
    }

    try {
      const userResponse = await axios.post(`${API_URL}/users`, {
        nombre: username,
      });
      const userId = userResponse.data.id;

      // Construir el payload para las clasificaciones.
      const payload = {
        userId,
        clasificaciones: Object.entries(classifications).map(
          ([commentId, value]) => ({
            comentarioId: parseInt(commentId),
            esPositivo: value === "esPositivo",
            esNegativo: value === "esNegativo",
            esNeutral: value === "esNeutral",
          })
        ),
      };

      await axios.post(`${API_URL}/classifications`, payload);
      // En lugar de un alert, se marca que se ha enviado la clasificación.
      setSubmitted(true);
    } catch (error) {
      console.error("Error al guardar la clasificación:", error);
      alert("Hubo un error al guardar la clasificación.");
    }
  };

  // Si se envió la clasificación, mostramos el componente Thanks.
  if (submitted) {
    return <Thanks />;
  }

  return (
    <div className="page-container">
      {/* Sección Superior (Header) */}
      <header className="header-section">
        <h1>Hola, {username}</h1>
      </header>

      {/* Sección Media (Instrucciones) */}
      <section className="instructions-section">
        <p>
          De acuerdo a tu criterio, selecciona el sentimiento que representa cada comentario.
        </p>
      </section>

      {/* Sección Principal (Comentarios y opciones) */}
      <main className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-row">
            <div className="comment-text">{comment.texto}</div>
            <div className="checkbox-group">
              {/* Los radio buttons comparten el mismo name por comentario */}
              <label>
                <input
                  type="radio"
                  name={`sentiment-${comment.id}`}
                  value="esPositivo"
                  onChange={() => handleRadioChange(comment.id, "esPositivo")}
                  checked={classifications[comment.id] === "esPositivo"}
                />
                Positivo
              </label>
              <label>
                <input
                  type="radio"
                  name={`sentiment-${comment.id}`}
                  value="esNegativo"
                  onChange={() => handleRadioChange(comment.id, "esNegativo")}
                  checked={classifications[comment.id] === "esNegativo"}
                />
                Negativo
              </label>
              <label>
                <input
                  type="radio"
                  name={`sentiment-${comment.id}`}
                  value="esNeutral"
                  onChange={() => handleRadioChange(comment.id, "esNeutral")}
                  checked={classifications[comment.id] === "esNeutral"}
                />
                Neutral
              </label>
            </div>
          </div>
        ))}
      </main>

      {/* Sección Inferior (Botón) */}
      <footer className="footer-section">
        <button className="enviar" onClick={handleSubmit}>
          Enviar Clasificación
        </button>
      </footer>
    </div>
  );
}

export default Classify;
