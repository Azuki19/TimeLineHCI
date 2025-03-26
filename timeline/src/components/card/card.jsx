import { useState } from "react";
import "./card.css";

export default function Card({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card-wrapper">
      {/* 🔥 Año y Nombre (Fuera de la tarjeta) */}
      <h1 className="card-year">{data.año}</h1>
      <h3 className="card-title">{data.nombre}</h3>

      {/* 🔥 Tarjeta (Solo imagen y detalles) */}
      <div className="card-container">
        <img
          src={data.img}
          alt={data.nombre}
          onClick={() => setShowDetails(!showDetails)}
          className="clickable-img"
        />

        {showDetails && (
          <div className="card-details">
            <p>{data.text1}</p>
            <p>{data.text2}</p>
            <p>{data.text3}</p>
          </div>
        )}
      </div>
    </div>
  );
}
