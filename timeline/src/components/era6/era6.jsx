import React, { useEffect, useState, useRef } from "react";
import "./era6.css";
import touchImg from "../../assets/touch.png";
import phoneImg from "../../assets/phone.png";


const milestones = [
	{
		año: '2023',
		nombre: ' Inteligencia Artificial Conversacional',
		img: 'https://pbs.twimg.com/media/Gm-biHVX0AAbXOZ?format=png&name=small',
		text1:
			'OpenAI lanzó ChatGPT, un modelo de lenguaje avanzado capaz de interactuar de manera natural con los usuarios.',
		text2:
			'Aplicaciones en atención al cliente, educación y generación de contenido. Capacidad de mantener conversaciones fluidas y personalizadas. Expansión del uso de IA en la vida diaria.',
		text3: 'ChatGPT revolucionó la forma en que las personas interactúan con la tecnología.',
	},
	{
		año: '2024',
		nombre: 'Primer implante Neuralink en humanos',
		img: 'https://pbs.twimg.com/media/Gm-bu4ZXkAAJnhL?format=jpg&name=medium',
		text1:
			'Neuralink implantó con éxito un chip en el cerebro humano, permitiendo el control de dispositivos con la mente.',
		text2:
			'Asistencia para personas con discapacidades motoras. Comunicación directa entre cerebro y máquina. Desarrollo de interfaces cerebro-computadora avanzadas.',
		text3: 'Este hito marca el inicio de la interacción humano-computadora a nivel neuronal.',
	},
];

export default function Timeline6() {
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
    <section className="timeline-container6">
      <section className="bienvenidaaa">
        <h1>Bienvenido/a a la Era de la Inteligencia Artificial y Neurotecnologí</h1>
        <p>Descubre los hitos importantes llevando la tarjeta perforada hasta el final.</p>
      </section>

      <div className="timeline6" ref={timelineRef}>
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
              top: `${index * (20 / (milestones.length - 1)) + 10}%`,
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
        <h2>Y eso fue un paso por la Era de la Inteligencia Artificial y Neurotecnología</h2>
        <p>¡Felicidades por completar la línea de tiempo!</p>
      </div>
    </section>

  );
}
