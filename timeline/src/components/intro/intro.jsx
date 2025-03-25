// src/components/Intro.js
import React from "react";

const Intro = () => {
  return (
    <section className="intro">
      <button onClick={() => window.location.href = "./era1.html"}>ERA 1</button>
      <h1>Un viaje a través del tiempo y la evolución del HCI (Interacción Humano - Computador)</h1>
      <p className="desliza">⬇ Desliza hacia abajo ⬇</p>
    </section>
  );
};

export default Intro;
