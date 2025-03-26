// InteractiveSection.jsx
import React, { useState } from 'react';
import './interactivesection.css'; // Asegúrate de tener los estilos correctos
import Timeline from '../era1/era1';

const InteractiveSection = () => {
	const [mostrarEra1, setMostrarEra1] = useState(false);

	const handleDrop = (event) => {
		event.preventDefault();
		setMostrarEra1(true); // Cambiar el estado cuando la tarjeta se suelta
	};

	const handleDragOver = (event) => {
		event.preventDefault(); // Permitir que el drop ocurra
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='arrastra'>Para vajar a la Era Pre Interactiva, arrastra la tarjeta perforable e ingresa los datos al computador</h3>
			<div className='drag-container'>
				<img
					id='perforada'
					src='https://pbs.twimg.com/media/Gm2S1vlbcAAjrfO?format=png&name=large'
					className='draggable'
					draggable='true'
					onDragStart={(event) => event.dataTransfer.setData('text', 'perforada')}
				/>

<div className="arrow-container">
    <span className="arrow">&gt;</span>
    <span className="arrow">&gt;</span>
    <span className="arrow">&gt;</span>
</div>

				<div id='pc' className='drop-zone' onDrop={handleDrop} onDragOver={handleDragOver}>
					<img src='https://pbs.twimg.com/media/Gm8rlVUXoAEvcIc?format=png&name=medium' />
				</div>
			</div>

			{/* Aquí solo se muestra la sección de la era 1 cuando `mostrarEra1` es verdadero */}
			{mostrarEra1 && <Timeline />}
		</section>
	);
};

export default InteractiveSection;