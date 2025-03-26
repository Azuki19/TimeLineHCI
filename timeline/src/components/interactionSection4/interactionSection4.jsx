import React, { useState, useEffect } from 'react';
import './interactionSection4.css';
import Timeline4 from '../era4/era4';

const InteractiveSection4 = () => {
	const [startPos, setStartPos] = useState(null);
	const [endPos, setEndPos] = useState(null);
	const [conectado, setConectado] = useState(false);
	const [cargando, setCargando] = useState(false);
	const [mostrarBoton, setMostrarBoton] = useState(true);

	// Coordenadas fijas
	const computadorPos = { x: 100, y: 250 };
	const modemPos = { x: 450, y: 250 };
	const botonPos = { x: 275, y: 250 };

	// Guardar datos de la Era 4 automáticamente
	const guardarDatosEra4 = () => {
		const data = { mensaje: 'Información guardada de la Era 4' };
		localStorage.setItem('era4Data', JSON.stringify(data));
		console.log('✅ Datos guardados en localStorage');
	};

	// Comprobar si hay datos guardados al iniciar
	useEffect(() => {
		const datosGuardados = localStorage.getItem('era4Data');
		if (datosGuardados) {
			setConectado(true);
			setMostrarBoton(false);
		} else {
			setConectado(false);
		}
	}, []);

	// Iniciar el arrastre del cable
	const handleMouseDown = (e) => {
		setStartPos({ x: e.clientX, y: e.clientY });
		setEndPos({ x: e.clientX, y: e.clientY });
	};

	// Mover el cable mientras se arrastra
	const handleMouseMove = (e) => {
		if (startPos && !conectado) {
			setEndPos({ x: e.clientX, y: e.clientY });
		}
	};

	// Soltar el cable y verificar conexión
	const handleMouseUp = () => {
		if (endPos) {
			const distancia = Math.sqrt(Math.pow(endPos.x - modemPos.x, 2) + Math.pow(endPos.y - modemPos.y, 2));
			if (distancia < 50) {
				conectar();
			} else {
				setStartPos(null);
				setEndPos(null);
			}
		}
	};

	// Conectar el sistema
	const conectar = () => {
		setCargando(true);
		setMostrarBoton(false);

		const audio = new Audio('https://www.myinstants.com/media/sounds/dial-up-modem.mp3');
		audio.play();

		setTimeout(() => {
			setCargando(false);
			setConectado(true);
			setEndPos(modemPos);
			guardarDatosEra4();
		}, 1000); // ⬅️ Se redujo el tiempo de espera a 2 segundos
	};

	// Desconectar sin confirmación y borrar datos
	const desconectar = () => {
		if (conectado) {
			localStorage.removeItem('era4Data');
			console.log('🗑 Datos eliminados de localStorage');

			setConectado(false);
			setMostrarBoton(true);
			setStartPos(null);
			setEndPos(null);
			window.location.reload();
		}
	};

	return (
		<section className='scroll-section-interactive' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
			<h3 className='titulo'>Presiona el botón para conectarte a la Era de la Computación Personal </h3>

			<div className='computador-container'>
				{/* Computador */}
				<img
					src='https://pbs.twimg.com/media/Gm7b-H7XYAAeQ7v?format=png&name=small'
					alt='Computador'
					className='computador-imagen'
					style={{ left: `${computadorPos.x}px`, top: `${computadorPos.y}px` }}
					onMouseDown={handleMouseDown}
					onClick={desconectar}
				/>

				{/* Módem */}
				<img
					src='https://pbs.twimg.com/media/Gm2Mz15XYAAg582?format=png&name=large'
					alt='Modem'
					className='modem-imagen'
					style={{ left: `${modemPos.x}px`, top: `${modemPos.y}px` }}
					onClick={desconectar}
				/>

				{/* Botón de conexión */}
				{!conectado && mostrarBoton && (
					<button
						id='boton-conectar'
						className='bttn-conectar'
						style={{ left: `${botonPos.x}px`, top: `${botonPos.y}px` }}
						onClick={conectar}
					>
						Conectar
					</button>
				)}

				{/* Cable visual */}
				{startPos && endPos && (
					<svg className='cable-svg'>
						<line x1={startPos.x} y1={startPos.y} x2={endPos.x} y2={endPos.y} stroke='white' strokeWidth='4' />
					</svg>
				)}
			</div>

			{/* Mensajes de estado */}
			{cargando && <div className='loading-bar'>Conectando...</div>}
			{conectado && <div className='mensaje'>Conexión exitosa</div>}

			{/* Mostrar la siguiente sección después de conectar */}
			{conectado && <Timeline4 />}
		</section>
	);
};

export default InteractiveSection4;
