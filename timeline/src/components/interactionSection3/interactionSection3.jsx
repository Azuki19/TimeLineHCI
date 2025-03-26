import React, { useState } from 'react';
import './interactionSection3.css';
import Timeline3 from '../era3/era3';

const InteractiveSection3 = () => {
	const [carpetaAbierta, setCarpetaAbierta] = useState(false);

	// Alternar estado de la carpeta al hacer clic en ella
	const handleClick = () => {
		setCarpetaAbierta((prev) => !prev);
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='titulo'>Haz clic en la carpeta para abrir o cerrar la Era de la Interfaz Gráfica</h3>
			<div className='carpeta-container' onClick={handleClick}>
				<img
					src={
						carpetaAbierta
							? 'https://pbs.twimg.com/media/Gm7TGWRWwAA9T2M?format=png&name=small' // Carpeta abierta
							: 'https://pbs.twimg.com/media/Gm7TOlNXoAA6HxA?format=png&name=small' // Carpeta cerrada
					}
					alt='Carpeta'
					className='carpeta-imagen'
				/>
				{carpetaAbierta && (
					<img
						src='https://pbs.twimg.com/media/Gm7T7kcXMAAZBKy?format=png&name=small' // Documento visible
						alt='Documento'
						className='documento-imagen'
					/>
				)}
			</div>
			{/* Mostrar Era3 solo si la carpeta está abierta */}
			{carpetaAbierta && <Timeline3 />}
		</section>
	);
};

export default InteractiveSection3;
