import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Intro.css';
import mouseImg from '../../assets/mouse.png';
import ibmImg from '../../assets/IBM.png';

// Registrar el plugin

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        // Animación de imágenes flotantes
        if (img1Ref.current && img2Ref.current) {
            gsap.fromTo(
                img1Ref.current,
                { y: 100, scale: 1.2 },
                {
                    y: -50,
                    scale: 1,
                    scrollTrigger: {
                        trigger: img1Ref.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                img2Ref.current,
                { y: 120, scale: 1.2 },
                {
                    y: -60,
                    scale: 1,
                    scrollTrigger: {
                        trigger: img2Ref.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }

        // Animación de partículas sutiles
        particlesRef.current.forEach((particle) => {
            gsap.to(particle, {
                y: '-=30',
                x: '+=10',
                opacity: 0.3,
                duration: 5 + Math.random() * 5,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        });
    }, []);

    return (
        <section className='intro'>
            <h1>Un viaje a través del tiempo y la evolución del HCI (Interacción Humano - Computador)</h1>
            <p className='desliza'>⬇ Desliza hacia abajo ⬇</p>

            {/* Partículas ligeras */}
            <div className='particle-container'>
                {[...Array(15)].map((_, i) => (
                    <div key={i} className='particle' ref={(el) => (particlesRef.current[i] = el)}></div>
                ))}
            </div>

            {/* Imágenes flotantes */}
            <img ref={img1Ref} src={mouseImg} alt='Flotante 1' className='floating-image img1' />
            <img ref={img2Ref} src={ibmImg} alt='Flotante 2' className='floating-image img2' />
        </section>
    );
};

export default Intro;