import React, { useEffect, useState, useRef } from 'react';
import './era1.css';

const milestones = [
	{
		año: '1945',
		nombre: 'El Memex y la primera idea de hipertexto',
		img: 'https://proyectoidis.org/wp-content/uploads/2014/10/memex.png',
		text1:
			'Vannevar Bush propuso el Memex, un sistema teórico que permitiría almacenar y recuperar información de manera flexible mediante enlaces asociativos.',
		text2:
			'Se conceptualizó como un dispositivo mecánico capaz de organizar información en estructuras similares a las conexiones neuronales humanas.',
		text3: 'Referencia: As We May Think - The Atlantic',
	},
	{
		año: '1950-1970',
		nombre: 'Uso de tarjetas perforadas en IBM y la computación comercial',
		img: 'https://www.publico.es/files/image_horizontal_mobile/uploads/2024/11/18/673b0300e68e9.jpeg',
		text1: 'Durante esta época, las computadoras de IBM usaban tarjetas perforadas para ingresar datos y programas.',
		text2:
			'Funcionamiento: Los usuarios perforaban tarjetas con comandos e información, luego las insertaban en un lector de tarjetas.',
		text3:
			'Este sistema fue esencial hasta la llegada de teclados y pantallas interactivas en las décadas de 1970 y 1980.',
	},
	{
		año: '1963',
		nombre: 'Sketchpad y el Light Pen',
		img: 'https://i.ytimg.com/vi/hB3jQKGrJo0/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGGYgZihmMA8=&rs=AOn4CLD1bo7ZNsOMm-3aDcKnDux3i0Ka8w',
		text1: 'Ivan Sutherland desarrolló Sketchpad, el primer software de diseño gráfico interactivo.',
		text2:
			'Este sistema permitió la manipulación de gráficos mediante una interfaz visual, sentando las bases del CAD.',
		text3: 'Referencia: Sketchpad y su impacto en la computación gráfica',
	},
];

const Era1 = () => {
	const [markerPosition, setMarkerPosition] = useState(0);
	const [expandedCard, setExpandedCard] = useState(null);
	const timelineRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!timelineRef.current) return;

			const timeline = timelineRef.current;
			const rect = timeline.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			const timelineHeight = rect.height;

			// Calcular la posición del scroll dentro de la línea de tiempo
			const scrolledInsideTimeline = Math.min(Math.max(windowHeight / 2 - rect.top, 0), timelineHeight);
			const newPosition = (scrolledInsideTimeline / timelineHeight) * 100;
			const boundedPosition = Math.max(0, Math.min(newPosition, 100));

			// Aplicar la nueva posición sin retrasos ni interpolaciones
			setMarkerPosition(boundedPosition);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const toggleCard = (index) => {
		setExpandedCard(expandedCard === index ? null : index);
	};

	return (
		<div className='timeline-container'>
			<div className='timeline' ref={timelineRef}>
				<img
					src='https://pbs.twimg.com/media/Gm5pmPYXMAEPWLV?format=png&name=small'
					alt='Máquina de escribir'
					className='user-marker'
					style={{ top: `${markerPosition}%` }}
				/>

				{milestones.map((milestone, index) => (
					<div
						key={index}
						className={`timeline-card ${index % 2 === 0 ? 'left' : 'right'} ${
							markerPosition > index * (100 / milestones.length) ? 'visible' : ''
						} ${expandedCard === index ? 'expanded' : ''}`}
						style={{ top: `${(index + 1) * (100 / milestones.length)}%` }}
						onClick={() => toggleCard(index)}
					>
						<img src={milestone.img} alt={milestone.nombre} />
						<h3>{milestone.nombre}</h3>
						<p>
							<strong>{milestone.año}</strong>
						</p>
						<p>{milestone.text1}</p>
						<p>{milestone.text2}</p>
						<p>{milestone.text3}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Era1;
