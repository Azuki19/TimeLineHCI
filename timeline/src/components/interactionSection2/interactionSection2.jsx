import React, { useState } from 'react';
import './interactionSection2.css';
import Era2 from '../era2/era2';

const InteractiveSection2 = () => {
	const [activo, setActivo] = useState(false);

	const toggleSwitch = () => {
		setActivo(!activo);
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='gira'>Da click para mover el joystick y avanzar en el tiempo</h3>
			<div className='switch-container' onClick={toggleSwitch}>
				<img
					src={
						activo
							? 'https://pbs.twimg.com/media/Gm7Mm3bXMAEGQUJ?format=png&name=small'
							: 'https://pbs.twimg.com/media/Gm7MzvPXsAAmMJU?format=png&name=small'
					}
					alt='Interruptor'
					className='switch-image'
				/>
			</div>
			{activo && <Era2 />}
		</section>
	);
};

export default InteractiveSection2;
