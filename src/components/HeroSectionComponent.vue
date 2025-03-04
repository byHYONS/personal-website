<script>
import { store } from '../store.js';

export default {
  name: 'HeroSection',
  data() {
    return {
      store,
    }
  },
}
</script>


<template>
  <section class="container-fluid hero">
    <!-- prima sezione con foto a destra -->
    <div class="row align-items-center hero-white">
      <!-- colonna testo -->
      <div class="col-12 col-lg-6 text-white px-3 px-md-5 py-5">
        <h4 class="subheading text-lowercase">imprenditore immobiliare</h4>
        <h2 class="gradient-text">
          brocker titolare e ceo<br />
          di hyons real estate
        </h2>
        <p class="description">
          Da titolare di un’agenzia specializzata in marketing immobiliare, trasformo la vendita e la promozione di
          immobili con tecniche innovative e un approccio diretto. <br />Con 10 anni di esperienza alle spalle, ho
          affinato la
          capacità di individuare le opportunità del mercato e massimizzare il potenziale di ogni proprietà. <br />Ogni
          progetto è una sfida che affronto con passione, unendo tecnologia e relazioni umane. Il
          risultato? Valore concreto per venditori e acquirenti.
        </p>
        <button class="explore-btn">
          <img src="/public/favicon/ring.svg" alt="icona cerchio" class="circle-icon" />
          <span class="text">esplora</span>
          <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
        </button>
      </div>
      <!-- colonna immagine -->
      <div class="col-12 col-lg-6 d-flex justify-content-center position-relative img-overlay bdb">
        <img src="/public/img/immobiliare.webp" alt="donna con tablet" class="image" />
      </div>
    </div>
    <!-- seconda sezione con foto a sinistra -->
    <div class="row align-items-center hero-black">
      <!-- Colonna Immagine -->
      <div class="col-12 col-lg-6 d-flex justify-content-center position-relative img-overlay order-2 order-lg-1">
        <img src="/public/img/marketing.webp" alt="Donna con tablet" class="image" />
      </div>
      <!-- colonna testo -->
      <div class="col-12 col-lg-6 text-white px-3 px-md-5 py-5 order-1 order-lg-2">
        <h4 class="subheading text-lowercase">copywriter e marketer a 365&#176</h4>
        <h2 class="gradient-text">
          il potere delle parole<br />
          la forza della strategia
        </h2>
        <p class="description">
          Ogni parola conta: grazie a un mix di psicologia, persuasione e marketing diretto, trasformo messaggi in leve
          di vendita. <br />Il mio approccio mette al centro i bisogni del pubblico, parlando alla mente e al cuore del
          cliente. <br />Dallo storytelling emozionale al copy persuasivo, ogni testo è progettato per catturare
          l’attenzione
          e convertire. La mia missione? Dare voce alle tue idee e tradurle in risultati tangibili.
        </p>
      </div>
    </div>
    <!-- terza sezione con foto a destra -->
    <div class="row align-items-center hero-white">
      <!-- Colonna Testo -->
      <div class="col-12 col-lg-6 text-white px-3 px-md-5 py-5">
        <h4 class="subheading text-lowercase">fullstack web developer</h4>
        <h2 class="gradient-text">
          dal front-end dinamico<br />
          al back-end scalabile
        </h2>
        <p class="description">
          Dalla creazione di interfacce responsive con Vue.js allo sviluppo di robuste API in Laravel, coniugo design e
          funzionalità per offrire soluzioni web complete. <br />Credo nell’innovazione continua e nella cura di ogni
          dettaglio, dall’usabilità all’architettura dei dati. <br />Ogni progetto è un’opportunità per unire creatività
          e
          performance, garantendo esperienze fluide e sicure. Il mio obiettivo? Far crescere il tuo business sfruttando
          il potenziale della tecnologia.
        </p>
      </div>
      <!-- Colonna Immagine -->
      <div class="col-12 col-lg-6 d-flex justify-content-center position-relative img-overlay">
        <img src="/public/img/fullstackdev.webp" alt="Donna con tablet" class="image" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/_variables.scss' as *;

.hero {

  /* immagine */
  .img-overlay {
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .image {

    img {
      display: block;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &:hover {
      transform: scale(10%);
    }
  }

  /* Titolo */
  h2 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  /* Stile della sezione */
  .hero-white {
    background-color: $color_02;
    position: relative;

    /* Sottotitolo */
    .subheading {
      color: $color_01;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    /* Descrizione */
    .description {
      max-width: 500px;
      font-weight: 300;
      color: $color_01;
    }

    p {
      margin-bottom: 0;
    }

    /* sfumatura */
    .img-overlay::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, $color_02 0%, rgba($color_02, 0.5) 10%, rgba(0, 0, 0, 0) 80%);
      z-index: 1;

    }

  }

  .hero-black {

    background-color: $color_01;
    position: relative;

    /* Sottotitolo */
    .subheading {
      color: $color_02;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    /* Descrizione */
    .description {
      max-width: 500px;
      font-weight: 100;
      color: $color_02;
      margin-bottom: 2rem;
    }

    /* sfumatura */
    .img-overlay::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to left, $color_01 0%, rgba($color_01, 0.5) 10%, rgba(0, 0, 0, 0) 80%);
      z-index: 1;

    }

  }
}
</style>
