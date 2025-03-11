<script>
import { store } from '../store.js';
import { ref, onMounted } from "vue";

export default {
  nome: 'Policy',
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
      store,
    };
  },
  methods: {

  },
  mounted() {
    // Carica lo script di Iubenda quando la pagina viene montata
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);

  },
}

</script>


<template>
  <section>
    <div class="container">

      <div ref="fadeElements" class="headline fade-up pt-5">
        <h4>privacy policy</h4>
        <h1 class="animated-text">www.samueleparatore.com</h1>
      </div>

     <div class="privacy">
      <a href="https://www.iubenda.com/privacy-policy/28879186"
        class="iubenda-white no-brand iubenda-noiframe iubenda-embed iub-legal-only iubenda-noiframe iub-body-embed"
        title="Privacy Policy">
        Privacy Policy
      </a>
     </div>

    </div>
  </section>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section {
  padding-top: 12rem;
  .privacy {
    padding: 5rem;
  }

}
</style>
