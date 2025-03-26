import React, { useEffect, useState, useRef } from "react";
import "./era4.css";
import joystickImg from "../../assets/joystick.png";
import consolaImg from "../../assets/consola.png";


const milestones = [
  {
    año: "1980",
    nombre: "  Expansión de las GUIs y WIMP",
    img: "https://pbs.twimg.com/media/Gm9XkwnWkAAhX7J?format=png&name=small",
    text1: "Durante los años 80, el modelo WIMP (Windows, Icons, Menus, Pointer) se convirtió en el estándar en la industria informática.",
    text2: "Su implementación cambió radicalmente la edición digital, dando origen a aplicaciones como Microsoft Word.",
    text3: "Referencia: Historia de Bravo",
  },
  {
    año: "1972",
    nombre: "La Tableta Gráfica: El nacimiento del dibujo digital",
    img: "https://i.blogs.es/61936c/sin-titulo/500_333.jpeg",
    text1: "La primera tableta gráfica comercial fue desarrollada en 1972 con el objetivo de permitir la interacción directa con una computadora a través de una superficie de dibujo. Este dispositivo se inspiró en experimentos anteriores de reconocimiento de escritura y gráficos, y sentó las bases para la industria del diseño digital.",
    text2: "Permitió a los diseñadores gráficos e ilustradores trabajar en un entorno digital con mayor precisión que con un ratón. Su tecnología inicial utilizaba un lápiz óptico y una superficie sensible a la presión.",
    text3: "Actualmente, se usan en diseño gráfico, arquitectura, videojuegos y cine.",
  },
  {
    año: "1968",
    nombre: "El Ratón",
    img: "https://nachoherraiz.wordpress.com/wp-content/uploads/2011/12/el-primer-raton.png",
    text1: "Douglas Engelbart presentó el primer mouse en La Madre de Todas las Demos, revolucionando la manera en que los usuarios interactúan con computadoras.",
    text2: "Su invención permitió una navegación más intuitiva en interfaces gráficas, estableciendo un estándar de interacción.",
    text3: "Referencia: Demo de Douglas Engelbart",
  },
  {
    año: "1973",
    nombre: "Xerox Alto: La primera computadora con GUI",
    img: "https://freight.cargo.site/t/original/i/3109c60c55ebdac24b725546764aff15c7b8a10ab737d9722e774dbe3b8c6936/grafacon.jpg",
    text1: "El Xerox Alto fue una computadora revolucionaria desarrollada en el PARC (Palo Alto Research Center) de Xerox. Aunque nunca se vendió comercialmente, fue la primera máquina en utilizar una Interfaz Gráfica de Usuario (GUI) basada en ventanas, iconos y menús desplegables.",
    text2: "Introducción del paradigma WIMP (Windows, Icons, Menus, Pointer). Uso del primer mouse como dispositivo principal de interacción.",
    text3: "Referencia: Xerox Alto en el Computer History Museum",
  },
	{
    año: "1981",
    nombre: "Xerox 8100 Star Information System: La primera GUI comercial",
    img: "https://freight.cargo.site/t/original/i/3109c60c55ebdac24b725546764aff15c7b8a10ab737d9722e774dbe3b8c6936/grafacon.jpg",
    text1: "El Xerox Star 8010 fue la primera computadora comercial que implementó una Interfaz Gráfica de Usuario (GUI) de manera masiva. Su sistema operaba completamente bajo el paradigma WIMP.",
    text2: "Uso de metáforas visuales como el escritorio, archivos y carpetas virtuales.",
    text3: " Aunque no fue un éxito comercial, estableció los fundamentos para las GUIs de Apple y Microsoft, convirtiéndose en el estándar de interacción digital.",
  },
	{
    año: "1983",
    nombre: "Apple Lisa y la evolución de la GUI",
    img: "https://freight.cargo.site/t/original/i/3109c60c55ebdac24b725546764aff15c7b8a10ab737d9722e774dbe3b8c6936/grafacon.jpg",
    text1: "Apple Lisa fue la primera computadora personal en comercializar una GUI. Introdujo la estructura de archivos y carpetas organizadas visualmente, facilitando la navegación y gestión de documentos digitales.",
    text2: "Primera computadora en ofrecer una GUI accesible al público general. Implementación de menús desplegables y múltiples ventanas. Uso de disquetes para almacenamiento y gestión de archivos.",
    text3: "  Lisa sentó las bases para el Macintosh (1984) y consolidó el concepto de interfaz gráfica en el mercado de consumo.",
  },

];

export default function Timeline4() {
  const [markerPosition, setMarkerPosition] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const [visibleMilestones, setVisibleMilestones] = useState({});
  const [clickedCards, setClickedCards] = useState({});
  const [showInteractionSection, setShowInteractionSection] = useState(false);
  const timelineRef = useRef(null);
  const pcFinalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current || !pcFinalRef.current) return;

      const timeline = timelineRef.current;
      const pcFinal = pcFinalRef.current;
      const rect = timeline.getBoundingClientRect();
      const pcFinalRect = pcFinal.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineHeight = rect.height;

      const scrolledInsideTimeline = Math.min(
        Math.max(windowHeight / 2 - rect.top, 0),
        timelineHeight
      );
      const newPosition = (scrolledInsideTimeline / timelineHeight) * 100;
      const boundedPosition = Math.max(0, Math.min(newPosition, 96)); // Reducimos el máximo a 70%


      setMarkerPosition(boundedPosition);

      // 🌀 Movimiento Parallax (Máximo ±30px)
      const maxOffset = 30;
      const newParallaxOffset = (scrolledInsideTimeline / windowHeight) * maxOffset - maxOffset / 2;
      setParallaxOffset(newParallaxOffset);

      const newVisibleMilestones = {};
      milestones.forEach((_, index) => {
        if (boundedPosition > index * (100 / milestones.length) - 10) {
          newVisibleMilestones[index] = true;
        }
      });

      setVisibleMilestones(newVisibleMilestones);

      // Mostrar InteractionSection cuando el user-marker llega a la PC final
      if (pcFinalRect.top <= windowHeight && pcFinalRect.bottom >= 0) {
        setShowInteractionSection(true);
      } else {
        setShowInteractionSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
    setClickedCards((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <section className="timeline-container">
      <section className="bienvenidaaa">
        <h1>Bienvenido/a a la Era Pre interactiva!</h1>
        <p>Descubre los hitos importantes llevando la tarjeta perforada hasta el final.</p>
      </section>

      <div className="timeline" ref={timelineRef}>
        {/* 🕹️ Joystick como user-marker */}
        <img
          className="user-marker"
          src="https://pbs.twimg.com/media/Gm7T7kcXMAAZBKy?format=png&name=small"
          alt="Joystick marcador"
          style={{
            top: `${markerPosition}%`,
            transform: `translateX(-50%) translateY(${parallaxOffset}px)`,
          }}
        />

        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${
              visibleMilestones[index] ? "visible" : ""
            }`}
            style={{
              top: `${index * (70 / (milestones.length - 1)) + 10}%`,
            }}
          >
            <div className={`brazo ${index % 2 === 0 ? "brazo-left" : "brazo-right"}`}></div>

            <div
              className={`tituloyesooo ${expandedCard === index ? "expanded" : ""} ${
                clickedCards[index] ? "clicked" : ""
              }`}
              onClick={() => toggleCard(index)}
            >
              <div className="title-container">
                {!clickedCards[index] && (
                  <img
                    className="click-icon"
                    src="https://pbs.twimg.com/media/Gm763hsWoAAp5ah?format=png&name=small"
                    alt="Click aquí"
                  />
                )}
                <h3 className="timeline-year">{milestone.año}</h3>
              </div>
              <h1 className="timeline-title">{milestone.nombre}</h1>
            </div>

            <div
              className={`timeline-card ${visibleMilestones[index] ? "visible" : ""} ${
                expandedCard === index ? "expanded" : ""
              }`}
              onClick={() => toggleCard(index)}
            >
              <img src={milestone.img} alt={milestone.nombre} />
              <div className="card-content">
                <p>{milestone.text1}</p>
                <p>{milestone.text2}</p>
                <p>{milestone.text3}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div ref={pcFinalRef}>
      <img className="pcfinal" src="https://pbs.twimg.com/media/Gm7TGWRWwAA9T2M?format=png&name=small" alt="Consola final" />

      </div>

      <div className="final">
        <h2>Y eso fue un paso por la Era Pre interactiva!</h2>
        <p>¡Felicidades por completar la línea de tiempo!</p>
      </div>
    </section>

  );
}
