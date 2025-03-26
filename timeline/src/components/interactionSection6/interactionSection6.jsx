import React, { useState } from 'react';
import './interactionSection6.css';
import Era6 from '../era6/era6';

const InteractiveSection6 = () => {
	const [conectado, setConectado] = useState(false);

	const conectarIA = () => {
		setConectado(true);
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='titulo'>Conéctate con la IA</h3>
			<div className='conexion-container'>
				<div className={`usuario ${conectado ? 'conectado' : ''}`} onMouseEnter={conectarIA}>
					<img
						src='https://pbs.twimg.com/media/Gm8wZuSXMAAzCtH?format=jpg&name=medium'
						alt='Usuario'
						className='usuario-img'
					/>
				</div>
				<div className={`linea ${conectado ? 'activa' : ''}`} />
				<div className={`ia ${conectado ? 'conectado' : ''}`}>
					<img src='https://pbs.twimg.com/media/Gm8yYHWXAAAaJdA?format=png&name=small' alt='IA' className='ia-img' />
					<span className='ia-texto'>IA</span>
				</div>
			</div>
			{conectado && <Era6 />}
		</section>
	);
};

export default InteractiveSection6;
