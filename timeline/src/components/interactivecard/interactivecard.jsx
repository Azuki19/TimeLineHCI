import { useState } from "react";
import "./interactivecard.css"; // Asegúrate de crear este archivo para los estilos

const InteractiveCard = () => {
	const [mostrarLineaTiempo, setMostrarLineaTiempo] = useState(false);

	const handleDrop = (event) => {
		event.preventDefault();
		setMostrarLineaTiempo(true); // Muestra la línea de tiempo
	};

	const handleDragOver = (event) => {
		event.preventDefault(); // Permite el drop
	};

	return (
		<div>
			{/* Contenedor de la tarjeta y el PC */}
			<div className="drag-container">
				<img
					id="perforada"
					src="ruta-de-tu-imagen.png"
					draggable="true"
					onDragStart={(event) => event.dataTransfer.setData("text", "perforada")}
				/>
				<div id="pc" onDrop={handleDrop} onDragOver={handleDragOver}>
					<img src="ruta-del-pc.png" />
				</div>
			</div>

			{/* Línea de tiempo que se mostrará cuando la tarjeta esté en el PC */}
			<section className={`Era ${mostrarLineaTiempo ? "active" : ""}`}>
				<h3>Primera línea de tiempo</h3>
				<p>Aquí aparece la historia...</p>
			</section>
		</div>
	);
};

export default InteractiveCard;
