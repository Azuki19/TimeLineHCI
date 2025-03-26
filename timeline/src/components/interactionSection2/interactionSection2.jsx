import React, { useState } from 'react';
import './interactionSection2.css';
import Timeline2 from '../era2/era2';

const InteractiveSection2 = () => {
	const [activo, setActivo] = useState(false);

	const toggleSwitch = () => {
		setActivo(!activo);
	};

	return (
		<section className='scroll-section-interactive'>
			<h3 className='arrastra'>Para vajar a la Era de la Interactividad Mecánica, Mueve el joystick para viajar a la era</h3>

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
			{activo && <Timeline2 />}
		</section>
	);
};

export default InteractiveSection2;
