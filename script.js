document.addEventListener("DOMContentLoaded", () => {
  const perforada = document.getElementById("perforada");
  const pc = document.getElementById("pc");
  const era1 = document.querySelector(".Era1");

  // Evento para permitir soltar la tarjeta en el PC
  pc.addEventListener("dragover", (event) => {
      event.preventDefault();
  });

  // Evento al soltar la tarjeta en el PC
  pc.addEventListener("drop", (event) => {
      event.preventDefault();

      // Agregar contenido a la sección ERA 1 (solo si está vacía)
      if (!era1.innerHTML.trim()) {
          era1.innerHTML = `
              <h2>Era 1: Primeros pasos en la computación</h2>
              <p>Las primeras computadoras utilizaban tarjetas perforadas para ingresar datos y ejecutar programas.</p>
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Punched_card.jpg" width="300px" />
          `;
      }

      // Agregar la clase active para mostrar la sección
      era1.classList.add("active");
  });
});
