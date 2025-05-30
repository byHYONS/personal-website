<script>
import { ref, onMounted } from "vue";

export default {
  nome: 'JumboComponent',
  // per effetto fade-up
  setup() {
    const fadeElements = ref(null);

    onMounted(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      });

      if (fadeElements.value) {
        observer.observe(fadeElements.value);
      }
    });

    return { fadeElements };
  },
  data() {
    return {

    };
  },
}

</script>


<template>

  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="image-hero col-md-5 d-none d-lg-block">
          <img class="img" src="/public/img/samuele-paratore.webp"
            alt="Samuele Paratore • Imprenditore Immobiliare, Marketer e FullStack Web Developer">
        </div>
        <div ref="fadeElements" class="headline fade-up col-12 col-lg-7">
          <!-- headline -->
          <h4>geometra</h4>
          <h1 class="animated-text">Samuele Paratore</h1>
          <hr>
          <!-- sub-headline -->
          <span>
            Imprenditore Immobiliare, Copywriter, Marketer a 360°
            e FullStack Web Developer...
          </span>
          <!-- bottone per invio a contactPage -->
          <button @click="$router.push('/contact')" class="explore-btn my-5">
            <img src="/public/favicon/ring.svg" alt="icona cerchio" class="circle-icon" />
            <span class="text">contattami</span>
            <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
          </button>
        </div>
      </div>
    </div>
  </section>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section {
  background: $color_01;
  padding-top: 11rem;
}

.container {

  .image-hero {

    img {
      width: 70%;
      margin-bottom: 2.1875rem;
      object-fit: cover;
      object-position: top;
      filter: drop-shadow(0px 0px 15px rgba(10, 12, 16, 0.8)) saturate(35%);
      opacity: .8;
    }
  }

  .headline {
    padding-left: min(38em, 8%);

    h1 {
      text-align: start;
      font-weight: 700;
    }

    span {
      color: $color_02;
      font-weight: 100;
    }

    h4 {
      color: $color_02;
      font-weight: 400;
    }

    hr {
      border: none;
      height: 1.5px;
      background: $gradient_03;
      margin: 20px 0;
    }

    span {
      color: $color_02;
      font-weight: 100;
    }
  }

  @media screen and (min-width: 991px) {
    .headline {
      padding: 0 25px;
    }
  }
}
</style>
