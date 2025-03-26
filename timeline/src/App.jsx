// App.jsx
import React from 'react';
import Intro from './components/intro/intro';
import ScrollSection from './components/scrollsection/scrollsection';
import InteractiveSection from './components/interactivesection/interactivesection';
import InteractiveSection2 from './components/interactionSection2/interactionSection2';
import InteractiveSection3 from './components/interactionSection3/interactionSection3';
import InteractiveSection4 from './components/interactionSection4/interactionSection4';

import './App.css';

function App() {
	return (
		<div>
			<Intro />
			<ScrollSection
				text1='Antes de las pantallas táctiles, antes del mouse, antes de las computadoras personales...'
				text2='¿Recuerdas cómo interactuábamos con la tecnología?'
			/>
			<ScrollSection
				text1='Desde los primeros intentos de interacción hasta la inteligencia artificial actual, cada avance ha acercado más a las personas y las máquinas.'
				text2='Explora la evolución de esta conexión y descubre cómo llegamos hasta aquí.'
			/>
			<InteractiveSection /> {/* Solo se pasa el componente aquí */}
			<InteractiveSection2 />
			<InteractiveSection3 />
			<InteractiveSection4 />
		</div>
	);
}

export default App;
