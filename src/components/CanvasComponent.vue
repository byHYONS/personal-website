<script>
import { store } from '../store.js';

export default {
  name: "Canvas",
  data() {
    return {
      store,
    }
  },
  methods: {
    byHyons() {

      let canvas = document.getElementById("myCanvas");
      let ctx = canvas.getContext("2d");

      let text = "byHYONS"; // Testo da animare
      let fontSize = 25; // Dimensione del font
      ctx.font = fontSize + "px Arial";

      // Misura la larghezza del testo
      let textWidth = ctx.measureText(text).width;
      let textHeight = fontSize; // Altezza approssimativa del testo

      // Posizione iniziale casuale
      let x = Math.random() * (canvas.width - textWidth);
      let y = Math.random() * (canvas.height - textHeight);

      // Velocità casuale iniziale
      //let speedX = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1);
      //let speedY = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1);
      let speedX = 2;
      let speedY = 2;

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas

        // Disegna il testo
        ctx.fillStyle = "violet";
        ctx.font = fontSize + "px Arial";
        ctx.fillText(text, x, y);

        // Aggiorna posizione
        x += speedX;
        y += speedY;

        // Controlla collisioni con le pareti orizzontali
        if (x + textWidth > canvas.width || x < 0) {
          speedX *= -1; // Inverti direzione orizzontale
        }

        // Controlla collisioni con le pareti verticali
        if (y > canvas.height || y - textHeight < 0) {
          speedY *= -1; // Inverti direzione verticale
        }

        requestAnimationFrame(animate); // Ripete l'animazione
      }

      animate(); // Avvia l'animazione

    }
  },
  mounted() {
    this.byHyons();
  }
}

</script>


<template>
  <div>
    <canvas id="myCanvas" width="1200" height="400" style="border:1px solid black;"></canvas>

  </div>
</template>


<style lang="scss" scoped></style>
