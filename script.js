document.addEventListener("DOMContentLoaded", () => {
  const musica = document.getElementById('musica');
  const envelope = document.getElementById('envelope');
  const nightSky = document.querySelector('.night');
  const corazonesContenedor = document.getElementById('corazones-contenedor');
  const flowersBg = document.querySelector('.flowers-bg');
  const cartaModalBg = document.getElementById('cartaModalBg');
  const cartaModal = document.getElementById('cartaModal');

  // Sustituye únicamente los emojis de luna y flores por la imagen centrada.
  document.querySelectorAll('.decoracion--luna, .decoracion--flores').forEach((elemento, indice, elementos) => {
    if (indice === 0 || elementos[indice - 1].parentElement !== elemento.parentElement) {
      const contenedor = elemento.parentElement;
      contenedor.querySelectorAll('.decoracion--luna, .decoracion--flores').forEach((decoracion) => decoracion.remove());
      const imagen = document.createElement('img');
      imagen.src = 'Imagen.jpg';
      imagen.alt = 'Imagen especial';
      imagen.className = 'imagen-decorativa';
      imagen.style.display = 'block';
      imagen.style.width = 'min(180px, 100%)';
      imagen.style.height = 'auto';
      imagen.style.margin = '0 auto';
      contenedor.appendChild(imagen);
    }
  });

  // Para rellenar la carta modal con el mismo contenido
  const tituloCarta = localStorage.getItem("tituloCarta") || "Feliz día del amor y la amistad";
  const mensajeCarta = localStorage.getItem("mensajeCarta") || "Eres una de las coincidencias más lindas que me ha dado la vida.<br>Espero seguir a tu lado durante mucho tiempo<br>y compartir juntos por primera vez todo lo que falta. <br>La vida es muy corta para no disfrutarla a tu lado.<br>Te quiero demasiado 💕";
  const firmaCarta = localStorage.getItem("firmaCarta") || "Con todo el cariño,<br><strong>Para una persona especial</strong>";

  document.getElementById("tituloCarta").innerHTML = tituloCarta;
  document.getElementById("mensajeCarta").innerHTML = mensajeCarta;
  document.getElementById("firmaCarta").innerHTML = firmaCarta;
  document.getElementById("tituloCartaFront").innerHTML = tituloCarta;

  document.getElementById("tituloCartaModal").innerHTML = tituloCarta;
  document.getElementById("mensajeCartaModal").innerHTML = mensajeCarta;
  document.getElementById("firmaCartaModal").innerHTML = firmaCarta;

  let corazonesInterval;
  let musicaIniciada = false;
  let abierta = false;

  envelope.addEventListener('click', () => {
    if (!abierta) {
      abrirSobre();
    }
  });

  cartaModalBg.addEventListener('click', (e) => {
    // Solo cerrar si se hace click fuera de la carta
    if (e.target === cartaModalBg) {
      cerrarSobre();
    }
  });

  function abrirSobre() {
    envelope.classList.add('salida');
    flowersBg.style.opacity = 1;
    cartaModalBg.classList.add('activo');
    abierta = true;

    if (!musicaIniciada) {
      musica.volume = 0.5;
      musica.play();
      musicaIniciada = true;
    }

    setTimeout(() => {
      crearEstrellasFugaces();
      if (!corazonesInterval) {
        corazonesInterval = setInterval(crearCorazones, 500);
      }
    }, 1000);
  }

  function cerrarSobre() {
    envelope.classList.remove('salida');
    flowersBg.style.opacity = 0;
    cartaModalBg.classList.remove('activo');
    abierta = false;

    nightSky.innerHTML = '';
    corazonesContenedor.innerHTML = '';
    clearInterval(corazonesInterval);
    corazonesInterval = null;
  }

  function crearEstrellasFugaces() {
    nightSky.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.classList.add('shooting_star');
      star.style.top = Math.random() * 100 + '%';
      star.style.left = (Math.random() * 100 - 50) + '%';
      star.style.animationDelay = Math.random() * 5 + 's';
      star.style.animationDuration = Math.random() * 2 + 3 + 's';
      nightSky.appendChild(star);
    }
  }

  function crearCorazones() {
    const corazon = document.createElement('div');
    corazon.classList.add('corazon');
    corazon.innerHTML = '❤';

    const esquina = Math.floor(Math.random() * 4);
    const offset = Math.random() * 20 + 10;

    switch (esquina) {
      case 0:
        corazon.style.top = `${offset}px`;
        corazon.style.left = `${offset}px`;
        break;
      case 1:
        corazon.style.top = `${offset}px`;
        corazon.style.right = `${offset}px`;
        break;
      case 2:
        corazon.style.bottom = `${offset}px`;
        corazon.style.left = `${offset}px`;
        break;
      case 3:
        corazon.style.bottom = `${offset}px`;
        corazon.style.right = `${offset}px`;
        break;
    }

    corazonesContenedor.appendChild(corazon);

    setTimeout(() => {
      corazon.remove();
    }, 5000);
  }
});
