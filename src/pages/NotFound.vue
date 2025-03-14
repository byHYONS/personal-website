<script>

export default {
  nome: 'NotFound',
  data() {
    return {
    };
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      const colors = [
        "hsl(29, 91%, 54%)", "hsl(11, 98%, 64%)", "hsl(352, 92%, 64%)",
        "hsl(336, 74%, 59%)", "hsl(313, 49%, 56%)", "hsl(256, 56%, 67%)",
        "hsl(212, 80%, 63%)", "hsl(195, 83%, 49%)", "hsl(186, 100%, 41%)",
        "hsl(176, 100%, 38%)", "hsl(155, 49%, 51%)", "hsl(105, 39%, 57%)"
      ];

      class Particle {
        constructor(x, y, color) {
          this.x = x;
          this.y = y;
          this.radius = Math.random() * 2 + 1;
          this.color = color;
          this.dx = (Math.random() - 0.5) * 2;
          this.dy = (Math.random() - 0.5) * 2;
          this.trail = [];
        }

        draw() {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.closePath();

          // Disegna la scia
          for (let i = 0; i < this.trail.length; i++) {
            let opacity = (1 - i / this.trail.length) * 0.5;
            ctx.beginPath();
            ctx.fillStyle = this.color.replace(")", `, ${opacity})`).replace("hsl", "hsla");
            ctx.arc(this.trail[i].x, this.trail[i].y, this.radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
          }
        }

        update() {
          this.x += this.dx;
          this.y += this.dy;

          // Collisione con il numero 404
          const pixelData = ctx.getImageData(this.x, this.y, 1, 1).data;
          if (pixelData[3] > 50) { // Se il pixel è disegnato (bordo del 404)
            this.dx = -this.dx;
            this.dy = -this.dy;
          }

          // Limiti bordo schermo
          if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
          if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;

          // Aggiungi scia
          this.trail.push({ x: this.x, y: this.y });
          if (this.trail.length > 10) this.trail.shift();

          this.draw();
        }
      }

      function draw404() {
        ctx.font = "bold 200px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 6;

        // Gradiente per il bordo del 404
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, "rgba(153, 145, 47, 1)");
        gradient.addColorStop(0.25, "rgba(47, 131, 153, 1)");
        gradient.addColorStop(0.55, "rgba(157, 33, 191, 1)");
        gradient.addColorStop(0.8, "rgba(217, 72, 125, 1)");

        ctx.strokeStyle = gradient;
        ctx.strokeText("404", canvas.width / 2, canvas.height / 2.1);
      }

      function drawText() {
        // Calcola la dimensione del testo in base alla larghezza dello schermo
        const textFontSize = Math.max(Math.min(canvas.width * 0.04, 40), 25); // Min 18px, Max 40px
        ctx.font = `bold ${textFontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Gradiente inverso per il testo sotto il 404
        const invertedGradient = ctx.createLinearGradient(canvas.width, canvas.height, 0, 0);
        invertedGradient.addColorStop(0, "rgba(217, 72, 125, 1)");
        invertedGradient.addColorStop(0.25, "rgba(157, 33, 191, 1)");
        invertedGradient.addColorStop(0.55, "rgba(47, 131, 153, 1)");
        invertedGradient.addColorStop(0.8, "rgba(153, 145, 47, 1)");

        ctx.fillStyle = invertedGradient;
        ctx.fillText("Oops! Pagina non trovata...", canvas.width / 2, canvas.height / 2 + 100);
      }

      function createParticles() {
        //  Numero di particelle dinamico in base alla dimensione dello schermo
        let numParticles = window.innerWidth > 1024 ? 300 : window.innerWidth > 768 ? 200 : 100;

        particles.length = 0; // Reset particelle per evitare accumuli

        for (let i = 0; i < numParticles; i++) {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let color = colors[Math.floor(Math.random() * colors.length)];
          particles.push(new Particle(x, y, color));
        }
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw404(); // Ridisegna il 404 ad ogni frame
        drawText(); // Aggiunge il testo sotto
        particles.forEach((particle) => particle.update());
        requestAnimationFrame(animate);
      }

      draw404();
      drawText();
      createParticles();
      animate();
    },
  },
  mounted() {
    this.initCanvas();
  },
}
</script>


<template>

  <section>
    <!-- pagina status 404 -->
    <div class="not-found">
      <canvas ref="canvas"></canvas>
    </div>
  </section>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section {

  .not-found {
    padding-top: 12rem;
    position: relative;
    height: 100vh;
    overflow: hidden;
    background: $color_01;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
