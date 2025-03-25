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
      <style>
        /* ======== RESET GENERAL ======== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        /* ======== BARRA DE PROGRESO SUPERIOR ======== */
        .progress-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: #ccc;
            height: 50px;
            display: flex;
            align-items: center;
            z-index: 10;
        }

        .progress-bar {
            width: 0;
            height: 100%;
            background: green;
            transition: width 0.2s;
            position: relative;
        }

        .mario {
            position: absolute;
            top: -15px;
            width: 40px;
        }

        /* ======== LÍNEA DE TIEMPO ======== */
        .timeline {
            margin-top: 100px;
            position: relative;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        /* ======== BARRA VERTICAL EN EL CENTRO ======== */
        .timeline-bar {
            position: absolute;
            left: 50%;
            top: 0;
            width: 10px;
            height: 100%;
            background: gray;
            transform: translateX(-50%);
        }

        /* ======== CUADRADO QUE SE MUEVE (USUARIO) ======== */
        .user-box {
            position: absolute;
            top: 0;
            left: 50%;
            width: 30px;
            height: 30px;
            background: black;
            transform: translateX(-50%);
            transition: top 0.5s ease-out;
            border-radius: 5px;
        }

        /* ======== EVENTOS ALTERNADOS ======== */
        .timeline-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }

        .event {
            background: #f5f5f5;
            padding: 20px;
            width: 400px;
            margin: 120px 0;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.5s ease-out, opacity 0.8s ease-in-out;
            opacity: 0;
            transform: translateY(50px);
            position: relative;
        }

        .event img {
            width: 100%;
            border-radius: 8px;
        }

        .event-info {
            display: none;
            margin-top: 10px;
            background: white;
            padding: 10px;
            border-radius: 8px;
        }

        /* Animación al mostrar */
        .event-info.active {
            display: block;
        }

        /* Alternar los eventos a izquierda y derecha */
        .event:nth-child(odd) {
            left: -450px;
            text-align: right;
        }

        .event:nth-child(even) {
            left: 450px;
            text-align: left;
        }

        .event.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Conectar los eventos con la línea */
        .event::before {
            content: "";
            position: absolute;
            width: 20px;
            height: 20px;
            background: gray;
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
        }

        .event:nth-child(odd)::before {
            right: -30px;
        }

        .event:nth-child(even)::before {
            left: -30px;
        }

        /* Espacio adicional para que el último evento sea visible */
        .spacer {
            height: 300px;
        }

    </style>
</head>
<body>

    <!-- Barra de progreso con Mario -->
    <div class="progress-container">
        <div class="progress-bar">
            <img src="mario.png" alt="Mario" class="mario">
        </div>
    </div>

    <!-- Línea de Tiempo -->
    <div class="timeline">

        <!-- Barra vertical en el centro -->
        <div class="timeline-bar">
            <div class="user-box" id="userBox"></div>
        </div>

        <div class="timeline-container">

            <div class="event" id="event1" onclick="toggleInfo(1)">
                <h3>1945</h3>
                <p>El Memex y la primera idea de hipertexto</p>
                <img src="memex.jpg" alt="Memex">
                <div class="event-info" id="info1">
                    <p>Se conceptualizó un sistema que permitiría...</p>
                </div>
            </div>

            <div class="event" id="event2" onclick="toggleInfo(2)">
                <h3>1950-1970</h3>
                <p>Uso de tarjetas perforadas en IBM</p>
                <img src="ibm.jpg" alt="IBM">
                <div class="event-info" id="info2">
                    <p>IBM utilizó tarjetas perforadas para...</p>
                </div>
            </div>

            <div class="event" id="event3" onclick="toggleInfo(3)">
                <h3>1963</h3>
                <p>Sketchpad y el Light Pen</p>
                <img src="sketchpad.jpg" alt="Sketchpad">
                <div class="event-info" id="info3">
                    <p>Ivan Sutherland desarrolló el primer sistema...</p>
                </div>
            </div>

        </div>

    </div>

    <div class="spacer"></div>

    <script>
        // Expande la información de cada evento al hacer clic
        function toggleInfo(id) {
            let info = document.getElementById("info" + id);
            info.classList.toggle("active");
        }

        // Mueve a Mario en la barra de progreso y el cuadrado en la línea de tiempo
        window.addEventListener("scroll", () => {
            let scrollPosition = window.scrollY;
            let documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            let scrollPercent = (scrollPosition / documentHeight) * 100;

            let progressBar = document.querySelector(".progress-bar");
            let mario = document.querySelector(".mario");
            let userBox = document.getElementById("userBox");

            progressBar.style.width = scrollPercent + "%";
            mario.style.left = \`calc(\${scrollPercent}% - 20px)\`

            // Mueve el cuadrado negro más lento
            let maxPosition = documentHeight * 0.9;
            let userBoxTop = (scrollPosition / maxPosition) * (window.innerHeight - 50);
            userBox.style.top = Math.min(userBoxTop, window.innerHeight - 50) + "px";

            // Hacer aparecer los eventos con mayor separación
            document.querySelectorAll(".event").forEach(event => {
                let eventTop = event.getBoundingClientRect().top;
                let windowHeight = window.innerHeight;
                if (eventTop < windowHeight * 0.75) {
                    event.classList.add("visible");
                }
            });
        });

        // Dispara el evento scroll al cargar
        document.addEventListener("DOMContentLoaded", () => {
            window.dispatchEvent(new Event("scroll"));
        });
    </script>
          `;
      }

      // Agregar la clase active para mostrar la sección
      era1.classList.add("active");
  });
});
