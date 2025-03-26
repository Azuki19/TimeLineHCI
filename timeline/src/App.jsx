import React, { useEffect, useRef, useState } from 'react';
import Intro from './components/intro/intro';
import ScrollSection from './components/scrollsection/scrollsection';
import InteractiveSection from './components/interactivesection/interactivesection';
import InteractiveSection2 from './components/interactionSection2/interactionSection2';
import InteractiveSection3 from './components/interactionSection3/interactionSection3';
import InteractiveSection4 from './components/interactionSection4/interactionSection4';
import InteractiveSection5 from './components/interactionSection5/interactionSection5';
import InteractiveSection6 from './components/interactionSection6/interactionSection6';

import './App.css';

function App() {
  const cursorRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* 🔥 Barra de Progreso */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Cursor personalizado */}
      <div ref={cursorRef} className='custom-cursor'></div>

      <Intro />
      <ScrollSection className='Texto1'
          text1='Antes de las pantallas táctiles, antes del mouse, antes de las computadoras personales...'
          text2='¿Recuerdas cómo interactuábamos con la tecnología?'
      />
      <section className='brl'></section>
      <ScrollSection className='Texto2'
          text1='Desde los primeros intentos de interacción hasta la inteligencia artificial actual, cada avance ha acercado más a las personas y las máquinas.'
          text2='Explora la evolución de esta conexión y descubre cómo llegamos hasta aquí.'
      />

      <section className='bg1'>
        <InteractiveSection />
      </section>

      <section className='bg2'>
        <InteractiveSection2 />
      </section>

      <section className='bg3'>
        <InteractiveSection3 />
      </section>

      <section className='bg4'>
        <InteractiveSection4 />
      </section>
      <section className='bg5'>
        <InteractiveSection5 />
      </section>
      <section className='bg6'>
        <InteractiveSection6 />
      </section>

      <ScrollSection className='Texto3'
          text1='Y así, la tecnología sigue avanzando al igual que el mundo!'
          text2='Gracias por ver la Línea del Tiempo de HCI'
      />
      <section className='w'></section>
    </div>
  );
}

export default App;
