import React, { useEffect, useState, useRef } from "react";
import "./era5.css";
import touchImg from "../../assets/touch.png";
import phoneImg from "../../assets/phone.png";


const milestones = [
	{
		año: '2001',
		nombre: 'Lanzamiento de Windows XP',
		img: 'https://pbs.twimg.com/media/Gm-auHFXcAAhVOq?format=png&name=small',
		text1:
			'Windows XP mejoró la estabilidad y facilidad de uso de las GUIs, consolidándose como uno de los sistemas operativos más populares.',
		text2:
			'Avances clave: Nueva interfaz visual con diseño más intuitivo, mejor administración de energía y conectividad de dispositivos.',
		text3: 'Windows XP se mantuvo en uso por más de una década debido a su estabilidad.',
	},
	{
		año: '2007',
		nombre: 'Revolución Táctil con el iPhone',
		img: 'https://pbs.twimg.com/media/Gm-aweiWkAAEvIt?format=png&name=small',
		text1:
			'El lanzamiento del iPhone en 2007 revolucionó la interacción digital con la introducción de pantallas multitáctiles y gestos.',
		text2:
			'Principales innovaciones: Eliminación de botones físicos, gesto de deslizar y pellizcar, creación de la App Store.',
		text3: 'El iPhone estableció el estándar para smartphones y la evolución de interfaces táctiles.',
	},
	{
		año: '2010',
		nombre: 'Microsoft Kinect y la interacción sin contacto',
		img: 'https://pbs.twimg.com/media/Gm-azZzWcAAWIxj?format=png&name=small',
		text1:
			'Kinect fue un dispositivo revolucionario que permitía el control de videojuegos sin necesidad de controladores físicos.',
		text2: 'Tecnologías clave: Sensores de profundidad y reconocimiento facial, control mediante gestos y voz.',
		text3: 'Kinect influyó en el desarrollo de tecnologías de realidad aumentada y asistentes inteligentes.',
	},
	{
		año: '2014',
		nombre: 'Alexa y la Interacción por Voz',
		img: 'https://pbs.twimg.com/media/Gm-a2fQWsAA7rG5?format=png&name=small',
		text1: 'Amazon lanzó Alexa, un asistente virtual que popularizó la interacción basada en comandos de voz.',
		text2:
			'Características clave: Uso de inteligencia artificial para interpretar lenguaje natural, integración con dispositivos de hogar inteligente.',
		text3: 'Alexa consolidó la tendencia de los asistentes activados por voz en la vida cotidiana.',
	},
];

export default function Timeline5() {
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
        if (boundedPosition > index * (90 / milestones.length) - 10) {
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
    <section className="timeline-container5">
      <section className="bienvenidaaa">
        <h1>Bienvenido/a a la Era de la Interacción Natura!</h1>
        <p>Descubre los hitos importantes llevando la tarjeta perforada hasta el final.</p>
      </section>

      <div className="timeline5" ref={timelineRef}>
        {/* 🕹️ Joystick como user-marker */}
        <img
          className="user-markerr"
          src={touchImg}
          alt="User Marker"
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
              top: `${index * (60 / (milestones.length - 1)) + 10}%`,
            }}
          >
            <div className={`brazo ${index % 2 === 0 ? "brazo-left" : "brazo-right"}`}></div>

            <div
              className={`tituloyesooo ${expandedCard === index ? "expanded" : ""} ${
                clickedCards[index] ? "clicked" : ""
              }`}
              onClick={() => toggleCard(index)}
            >
              <div className="title-containeeer">
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
      <img className="pcfinal" src={phoneImg} alt="Consola final" />

      </div>

      <div className="final">
        <h2>Y eso fue un paso por la Era de la Interacción Natura!</h2>
        <p>¡Felicidades por completar la línea de tiempo!</p>
      </div>
    </section>

  );
}
