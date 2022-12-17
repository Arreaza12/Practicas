import { useState } from "react";
import styles from "./WeatherForm.module.css";
import Button from "@mui/material/button";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState("");

  function onChange(e) {
    const value = e.target.value;
    if (value !== "") {
      setCity(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onChangeCity(city);
  }

  const pulsar = () => {
    console.log("me has pulsado");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="text" onChange={onChange} className={styles.input} />
      <Button className={styles.button} onClick={pulsar()}>
        Aceptar
      </Button>
    </form>
  );
}
