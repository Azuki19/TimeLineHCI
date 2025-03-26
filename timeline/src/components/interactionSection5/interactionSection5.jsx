import React, { useState, useRef } from 'react';
import './interactionSection5.css';
import Era5 from '../era5/era5';

const InteractiveSection5 = () => {
	const [desbloqueado, setDesbloqueado] = useState(false);
	const [posicion, setPosicion] = useState(0);
	const deslizadorRef = useRef(null);

	// Manejar el arrastre del ícono
	const handleMouseDown = (e) => {
		if (desbloqueado) return;

		const inicioX = e.clientX;

		const handleMouseMove = (e) => {
			const desplazamiento = e.clientX - inicioX;
			const nuevaPosicion = Math.max(0, Math.min(200, desplazamiento)); // Límite de 200px
			setPosicion(nuevaPosicion);

			if (nuevaPosicion >= 180) {
				setDesbloqueado(true);
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			}
		};

		const handleMouseUp = () => {
			if (!desbloqueado) setPosicion(0);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='titulo'>Desliza para desbloquear</h3>

			<div className={`pantalla-bloqueo ${desbloqueado ? 'desbloqueado' : ''}`}>
				{/* Imagen de pantalla bloqueada o desbloqueada */}
				<img
					src={
						desbloqueado
							? 'https://pbs.twimg.com/media/Gm8Kwi4XgAAcoqg?format=png&name=900x900'
							: 'https://pbs.twimg.com/media/Gm8KU3WWsAAbHDb?format=png&name=small'
					}
					alt='Pantalla'
					className='imagen-pantalla'
				/>

				{/* Deslizador (visible solo si no está desbloqueado) */}
				{!desbloqueado && (
					<div className='deslizador-container'>
						<div
							ref={deslizadorRef}
							className='deslizador'
							style={{ transform: `translateX(${posicion}px)` }}
							onMouseDown={handleMouseDown}
						>
							➡️
						</div>
					</div>
				)}
			</div>

			{/* Mostrar la siguiente era después de desbloquear */}
			{desbloqueado && <Era5 />}
		</section>
	);
};

export default InteractiveSection5;
