import React, { useState, useEffect } from "react";
import styles from "../styles/Form.module.css";

const Form = () => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [season, setSeason] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://localhost:3001/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      setError(
        "Error al obtener la lista de países. Por favor, intenta nuevamente más tarde."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !difficulty || !duration || !season || selectedCountries.length === 0) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const actividadTuristica = {
      name,
      difficulty,
      duration,
      season,
      countries: selectedCountries,
    };

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
          setError(
            "Error al crear la actividad turística. Por favor, intenta nuevamente más tarde."
          );
        }
      })
      .catch((error) => {
        setError(
          "Error al crear la actividad turística. Por favor, intenta nuevamente más tarde."
        );
      });
  };

  const handleCountrySelection = (e) => {
    setSelectedCountries(Array.from(e.target.selectedOptions, (option) => option.value));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Dificultad:</label>
        <select
          className={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Senderismo">Senderismo</option>
            <option value="Surf">Surf</option>
            <option value="Esquí">Esquí</option>
            <option value="Buceo">Buceo</option>
            <option value="Observación de aves">Observación de aves</option>
            <option value="Excursiones en bicicleta">Excursiones en bicicleta</option>
            <option value="Turismo gastronómico">Turismo gastronómico</option>
            <option value="Visitas a viñedos">Visitas a viñedos</option>
            <option value="Escalada en roca">Escalada en roca</option>
            <option value="Turismo cultural">Turismo cultural</option>
            <option value="Visitas a monumentos históricos">Visitas a monumentos históricos</option>
            <option value="Turismo de aventura">Turismo de aventura</option>
            <option value="Safari">Safari</option>
            <option value="Kayak">Kayak</option>
            <option value="Yoga y meditación">Yoga y meditación</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Dificultad:</label>
        <select
          className={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Seleccione la dificultad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Duración:</label>
        <input
  className={styles.input}
  type="time"
  value={duration}
  onChange={(e) => setDuration(e.target.value)}
/>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Temporada:</label>
        <select
          className={styles.select}
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="">Seleccione la temporada</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Autum">Autum</option>
          <option value="Spring">Spring</option>
        </select>
      </div>

<div className={styles.inputGroup}>
  <label className={styles.label}>Países:</label>
  <select
    className={styles.select}
    multiple
    value={selectedCountries} 
    onChange={handleCountrySelection} 
  >
    <option value="">Seleccione los países</option>
    {countries.map((country) => (
      <option key={country.id} value={country.id}>
        {country.name}
      </option>
    ))}
  </select>
</div>

      <button className={styles.button} type="submit">
        Crear actividad turística
      </button>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
    </form>
  );
};

export default Form;