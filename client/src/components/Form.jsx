import React, { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !difficulty || !duration || !season || countries.length === 0) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Aquí puedes realizar las validaciones adicionales con JavaScript
    // Por ejemplo, puedes verificar si la duración es un número válido, etc.

    // Crea la actividad turística utilizando los datos del formulario
    const actividadTuristica = {
        name,
        difficulty,
        duration,
        season,
        countries,
    };

    // Aquí puedes realizar la lógica para enviar la actividad turística al backend
    // Simularemos el envío y manejo de errores en este ejemplo
    // Supongamos que hay un error en el backend
    fetch("http://localhost:3001/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actividadTuristica),
      })
        .then((response) => {
          if (response.ok) {
            setSuccess("La actividad turística se creó correctamente.");
            setName("");
            setDifficulty("");
            setDuration("");
            setSeason("");
            setCountries([]);
          } else {
            setError("Error al crear la actividad turística. Por favor, intenta nuevamente más tarde.");
          }
        })
        .catch((error) => {
          setError("Error al crear la actividad turística. Por favor, intenta nuevamente más tarde.");
        });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Dificultad:
        <input
          type="text"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </label>
      <br />
      <label>
        Duración:
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </label>
      <br />
      <label>
        Temporada:
        <input
          type="text"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />
      </label>
      <br />
      <label>
        Países:
        <select multiple value={countries} onChange={(e) => setCountries(Array.from(e.target.selectedOptions, (option) => option.value))}>
          <option value="ATF">ATF</option>
          <option value="pais2">País 2</option>
          <option value="pais3">País 3</option>
          {/* Agrega más opciones de países según tus necesidades */}
        </select>
      </label>
      <br />
      <button type="submit">Crear actividad turística</button>

      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
};

export default Form