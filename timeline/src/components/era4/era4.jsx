import React, { useEffect, useState, useRef } from "react";
import "./era4.css";
import joystickImg from "../../assets/joystick.png";
import consolaImg from "../../assets/consola.png";


const milestones = [
  {
    año: "1980",
    nombre: "Expansión de las GUIs y WIMP",
    img: "https://pbs.twimg.com/media/Gm-aUBZXEAEKbii?format=png&name=small",
    text1: "Durante los años 80, el modelo WIMP (Windows, Icons, Menus, Pointer) se convirtió en el estándar en la industria informática.",
    text2: "Simultáneamente, los editores WYSIWYG (What You See Is What You Get) evolucionaron, permitiendo a los usuarios ver en pantalla una representación fiel de sus documentos impresos.",
    text3: "1984: Apple lanza el Macintosh, popularizando las interfaces gráficas.   1985: Microsoft introduce Windows 1.0, dando inicio a su ecosistema gráfico. 1987: Amiga y Atari ST llevan las GUIs al mundo de los videojuegos y multimedia. ",
  },
  {
    año: "1990",
    nombre: "Creación de la Web (WWW)",
    img: "https://pbs.twimg.com/media/Gm-aY9tWsAAXtQW?format=png&name=small",
    text1: "Tim Berners-Lee desarrolla la World Wide Web, permitiendo la interacción global en internet.",
    text2: "Referencia: Historia de la Web",
    text3: "",
  },
  {
    año: "1995",
    nombre: "Windows 95 y la popularización del ratón",
    img: "https://pbs.twimg.com/media/Gm-aVgOWYAAnNZD?format=png&name=small",
    text1: "Windows 95 revolucionó la experiencia de usuario al introducir la barra de tareas y el botón de inicio, elementos que facilitaron la navegación y la gestión de aplicaciones. ",
    text2: "Con estas innovaciones, Windows 95 consolidó el modelo gráfico de interfaces y contribuyó al dominio de Microsoft en el mercado de los sistemas operativos.",
    text3: "Referencia: En 1995, Microsoft transformó...",
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
        if (boundedPosition > index * (50 / milestones.length) - 10) {
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
    <section className="timeline-container4">
      <section className="bienvenidaaa">
        <h1>Bienvenido/a a la Era de la Interfaz Gráfica</h1>
        <p>Descubre los hitos importantes llevando el documento hasta el final.</p>
      </section>

      <div className="timeline4" ref={timelineRef}>
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
              top: `${index * (40 / (milestones.length - 1)) + 10}%`,
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
        <h2>Y eso fue un paso por la Era de la computación personal!</h2>
        <p>¡Felicidades por completar la línea de tiempo!</p>
      </div>
    </section>

  );
}
