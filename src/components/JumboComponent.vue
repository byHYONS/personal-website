<script>
import { store } from '../store.js';
import { ref, onMounted } from "vue";
import imagesTransiction from '../components/ImageTransictionComponent.vue';
import carousel from '../components/CarouselComponent.vue';

export default {
  nome: 'JumboComponent',
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
  components: {
    imagesTransiction,
    carousel,
  },
  emits: ["closeModale"],  // componente figlio
  props: {  // componente figlio
    nome: String, // Dichiara il tipo della prop
    eta: Number
  },
  emits: ["closeModale"],
  data() {
    return {
      store,

    };
  },
  methods: {

  },
  mounted() {

  }
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
          <h4>geomentra</h4>
          <h1 class="animated-text">Samuele Paratore</h1>
          <hr>
          <span>Imprenditore Immobiliare, Copywriter, Marketer a 365° <br>
            e FullStack Web Developer...</span>

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
  width: 100vw;
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

    h1 {
      text-align: start;
      font-weight: 800;
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
}
</style>
