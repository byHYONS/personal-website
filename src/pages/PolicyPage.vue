<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "Policy",

  setup() {
    const fadeElements = ref(null);
    let observer = null;

    onMounted(() => {
      if (!fadeElements.value) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(fadeElements.value);
    });

    onUnmounted(() => {
      observer?.disconnect();
    });

    return { fadeElements };
  },

  mounted() {
    // Carica lo script originale di Iubenda
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
  },
};
</script>

<template>
  <section>
    <div class="container">

      <!-- Titolo pagina -->
      <div ref="fadeElements" class="headline fade-up pt-5">
        <h4>privacy policy</h4>
        <h1 class="animated-text">www.samueleparatore.com</h1>
      </div>

      <!-- Privacy Policy originale Iubenda -->
      <div class="privacy">
        <a
          href="https://www.iubenda.com/privacy-policy/28879186"
          class="iubenda-white no-brand iubenda-noiframe iubenda-embed iub-legal-only iub-body-embed"
          title="Privacy Policy"
        >
          Privacy Policy
        </a>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables" as *;

section {
  padding-top: 12rem;

  .privacy {
    padding: 5rem;

    // Nasconde il pulsante originale e quello generato da Iubenda
    :deep(a.iubenda-embed),
    :deep(a.iubenda-embed:hover),
    :deep(a.iubenda-embed:focus) {
      visibility: hidden !important;
    }

    // Nasconde il titolo Privacy Policy di www.tophouseday.com
    :deep(#iubenda_policy .iub_header > h1) {
      display: none !important;
    }
  }
}
</style>
