import React from "react";
import Form from "./Form";
import styles from "../styles/FormPage.module.css"; // Importar el archivo CSS module

const FormPage = () => {
  return (
    <div className={styles.formPage}>
      <h1>Formulario de creación de actividad turística</h1>
      <Form />
    </div>
  );
};

export default FormPage;