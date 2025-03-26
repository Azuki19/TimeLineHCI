import React, { useEffect, useState, useRef } from "react";
import "./era2.css";
import joystickImg from "../../assets/joystick.png";
import consolaImg from "../../assets/consola.png";


const milestones = [
  {
    año: "1964",
    nombre: "Primer sistema de tiempo compartido",
    img: "https://pbs.twimg.com/media/Gm9XkwnWkAAhX7J?format=png&name=small",
    text1: "Se desarrolla el Compatible Time-Sharing System (CTSS) en el MIT, permitiendo a múltiples usuarios interactuar simultáneamente con una computadora central..",
    text2: "Introdujo el concepto de sesiones interactivas...",
    text3: "Referencia: Historia de CTSS",
  },
  {
    año: "1967",
    nombre: "Joystick y Knee Control",
    img: "https://i.blogs.es/61936c/sin-titulo/500_333.jpeg",
    text1: "Introdujo el concepto de sesiones interactivas y procesamiento en paralelo, sentando las bases de los sistemas multiusuario actuales...",
    text2: "Knee Control, una innovación que permitía controlar computadoras con movimientos de la rodilla, explorando formas alternativas de interacción.",
    text3: "Estos dispositivos fueron precursores de las interfaces hápticas y ergonómicas.",
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
    año: "1969",
    nombre: "Grafacon",
    img: "https://freight.cargo.site/t/original/i/3109c60c55ebdac24b725546764aff15c7b8a10ab737d9722e774dbe3b8c6936/grafacon.jpg",
    text1: "Dispositivo que permitió la interacción con gráficos de manera más intuitiva.",
    text2: "Su uso facilitó el desarrollo de herramientas gráficas interactivas para diseño digital y modelado.",
    text3: "",
  },
];

export default function Timeline2() {
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
      const boundedPosition = Math.max(0, Math.min(newPosition, 96));

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
      <section className="bienvenidaa">
        <h1>Bienvenido/a a la Era Pre interactiva!</h1>
        <p>Descubre los hitos importantes llevando la tarjeta perforada hasta el final.</p>
      </section>

      <div className="timeline" ref={timelineRef}>
        {/* 🕹️ Joystick como user-marker */}
        <img
          className="user-marker"
          src={joystickImg}
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
              top: `${index * (50 / (milestones.length - 1)) + 10}%`,
            }}
          >
            <div className={`brazo ${index % 2 === 0 ? "brazo-left" : "brazo-right"}`}></div>

            <div
              className={`tituloyesoo ${expandedCard === index ? "expanded" : ""} ${
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
      <img className="pcfinal" src={consolaImg} alt="Consola final" />

      </div>

      <div className="final">
        <h2>Y eso fue un paso por la Era Pre interactiva!</h2>
        <p>¡Felicidades por completar la línea de tiempo!</p>
      </div>
    </section>
  );
}
