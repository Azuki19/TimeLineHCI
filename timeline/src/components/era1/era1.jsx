import React, { useEffect, useState, useRef } from "react";
import "./era1.css";

const milestones = [
  { img: "https://via.placeholder.com/150", text: "Evento 1" },
  { img: "https://via.placeholder.com/150", text: "Evento 2" },
  { img: "https://via.placeholder.com/150", text: "Evento 3" },
  { img: "https://via.placeholder.com/150", text: "Evento 4" },
];

const Era1 = () => {
  const [markerPosition, setMarkerPosition] = useState(0);
  const timelineRef = useRef(null);
  const lastScrollY = useRef(0);
  const lastPosition = useRef(0); // Para guardar la última posición de la bolita

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineHeight = rect.height;

      // Solo actualizar si la línea de tiempo está en la pantalla
      if (rect.top >= windowHeight || rect.bottom <= 0) return;

      // Determinar cuánto ha avanzado dentro de la línea
      const scrolledInsideTimeline = Math.min(
        Math.max(windowHeight - rect.top, 0),
        timelineHeight
      );

      // Calcular la nueva posición basada en el desplazamiento
      const newPosition = (scrolledInsideTimeline / timelineHeight) * 100;

      // Asegurarse de que la bolita no se salga de la línea (entre 0% y 100%)
      const boundedPosition = Math.max(0, Math.min(newPosition, 100));

      // Calcular la dirección del scroll (hacia abajo o hacia arriba)
      const direction = window.scrollY > lastScrollY.current ? 1 : -1;

      // Si el scroll va hacia arriba, queremos que la bolita suba rápido
      const speedFactor = direction === -1 ? 0.3 : 0.1; // Aumenta la velocidad al subir

      // Hacer que la bolita se mueva de manera suave hacia la nueva posición
      const diff = boundedPosition - lastPosition.current;

      // Controlar que el movimiento sea suave y no sobrepasar el límite
      const smoothMovement = lastPosition.current + diff * speedFactor;

      lastPosition.current = smoothMovement;

      // Actualizar la posición de la bolita
      setMarkerPosition(smoothMovement);

      lastScrollY.current = window.scrollY; // Actualiza la última posición del scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline-container">
      <div className="timeline" ref={timelineRef}>
        <div
          className="user-marker"
          style={{
            top: `${markerPosition}%`, // La bolita sigue el progreso en la línea
          }}
        ></div>

        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`timeline-card ${index % 2 === 0 ? "left" : "right"} ${
              markerPosition > (index + 1) * (100 / milestones.length) ? "visible" : ""
            }`}
            style={{ top: `${(index + 1) * (100 / milestones.length)}%` }}
          >
            <img src={milestone.img} alt={milestone.text} />
            <p>{milestone.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Era1;
