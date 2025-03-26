import React, { useEffect, useRef } from 'react';
import Intro from './components/intro/intro';
import ScrollSection from './components/scrollsection/scrollsection';
import InteractiveSection from './components/interactivesection/interactivesection';
import InteractiveSection2 from './components/interactionSection2/interactionSection2';
import InteractiveSection3 from './components/interactionSection3/interactionSection3';
import InteractiveSection4 from './components/interactionSection4/interactionSection4';

import './App.css';

function App() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                const { clientX: x, clientY: y } = e;
                cursorRef.current.style.left = `${x}px`;
                cursorRef.current.style.top = `${y}px`;
            }
        };

        const addHoverEffect = () => {
            cursorRef.current?.classList.add('hovered');
        };

        const removeHoverEffect = () => {
            cursorRef.current?.classList.remove('hovered');
        };

        // Agregar eventos para el movimiento
        document.addEventListener('mousemove', moveCursor);

        // Detectar elementos interactivos
        const interactiveElements = document.querySelectorAll('button, a, .interactivo');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', addHoverEffect);
            el.addEventListener('mouseleave', removeHoverEffect);
        });

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', addHoverEffect);
                el.removeEventListener('mouseleave', removeHoverEffect);
            });
        };
    }, []);

    return (
        <div>
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

            <InteractiveSection2 />
            <InteractiveSection3 />
            <InteractiveSection4 />
        </div>
    );
}

export default App;
  