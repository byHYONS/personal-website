<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  name: "Cookie",
  setup() {
    const fadeElements = ref(null);
    let observer = null;
    onMounted(() => {
      if (!fadeElements.value) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer?.unobserve(entry.target);
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
  data() {
    return {
      cookieContent: "",
      cookieError: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        "https://www.iubenda.com/api/privacy-policy/28879186/cookie-policy"
      );
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (!data.success || !data.content) {
        throw new Error("Contenuto Cookie Policy non disponibile");
      }
      // Converte l'HTML di Iubenda in un documento temporaneo
      const doc = new DOMParser().parseFromString(data.content, "text/html");

      // Individua il titolo iniziale della Cookie Policy
      const title = [...doc.querySelectorAll("#iubenda_policy h2")]
        .find((element) =>
          element.textContent.trim().startsWith("Cookie Policy di")
        );

      // Rimuove esclusivamente quel titolo
      title?.remove();

      // Inserisce il documento nella pagina senza il titolo
      this.cookieContent = doc.body.innerHTML;
    } catch (error) {
      console.error("Errore caricamento Cookie Policy:", error);
      this.cookieError = true;
    }
  },
};
</script>
<template>
  <section>
    <div class="container">
      <!-- Titolo pagina -->
      <div ref="fadeElements" class="headline fade-up pt-5">
        <h4>cookie policy</h4>
        <h1 class="animated-text">www.samueleparatore.com</h1>
      </div>
      <!-- Documento Cookie Policy -->
      <div class="cookie">
        <div
          v-if="cookieContent"
          class="cookie-document"
          v-html="cookieContent"
        ></div>
        <div v-else-if="cookieError" class="cookie-message">
          <p>Non è stato possibile caricare la Cookie Policy.</p>
          <a
            href="https://www.iubenda.com/privacy-policy/28879186/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consulta la Cookie Policy su Iubenda
          </a>
        </div>
        <p v-else class="cookie-message">
          Caricamento Cookie Policy...
        </p>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use "../assets/scss/partials/variables" as *;
section {
  padding-top: 12rem;
  .cookie {
    padding: 5rem 0;
  }
  .cookie-document {
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;
    // Nasconde esclusivamente il titolo iniziale di Iubenda
    :deep(#iubenda_policy #wbars > h2:first-child) {
      display: none;
    }
    // Contenitore principale Iubenda
    :deep(#iubenda_policy) {
      position: static;
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      color: $color_01;
      background: transparent;
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.7;
    }
    :deep(#iubenda_policy *) {
      box-sizing: border-box;
    }
    // Titoli
    :deep(#iubenda_policy h2) {
      margin: 2.5rem 0 1rem;
      font-family: "Josefin Sans", sans-serif;
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 700;
      line-height: 1.3;
      color: $color_01;
    }
    :deep(#iubenda_policy h3) {
      margin: 2rem 0 0.75rem;
      font-family: "Josefin Sans", sans-serif;
      font-size: clamp(1.25rem, 2.5vw, 1.5rem);
      font-weight: 700;
      line-height: 1.4;
      color: $color_01;
    }
    :deep(#iubenda_policy h4) {
      margin: 1.5rem 0 0.75rem;
      font-family: "Josefin Sans", sans-serif;
      font-size: clamp(1.1rem, 2vw, 1.25rem);
      font-weight: 700;
      line-height: 1.4;
      color: $color_01;
    }
    // Paragrafi
    :deep(#iubenda_policy p),
    :deep(#iubenda_policy li),
    :deep(#iubenda_policy span) {
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.7;
      color: $color_01;
    }
    :deep(#iubenda_policy p) {
      margin: 0 0 1rem;
    }
    // Collegamenti
    :deep(#iubenda_policy a) {
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.6;
      color: $color_04;
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.2s ease;
      &:hover {
        color: $color_05;
      }
    }
    // Sezioni espandibili: titoli più piccoli e leggeri
    :deep(#iubenda_policy details) {
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid $color_07;
    }
    :deep(#iubenda_policy summary) {
      cursor: pointer;
      padding: 0.5rem 0;
      font-family: "Josefin Sans", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: $color_01;
      transition: color 0.2s ease;
      &:hover {
        color: $color_04;
      }
    }
    // Ridimensiona anche i titoli interni ai summary
    :deep(#iubenda_policy summary h3),
    :deep(#iubenda_policy summary h4) {
      display: inline;
      margin: 0;
      font-family: "Josefin Sans", sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: inherit;
    }
    // Elenchi
    :deep(#iubenda_policy ul),
    :deep(#iubenda_policy ol) {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    :deep(#iubenda_policy li) {
      margin-bottom: 0.5rem;
    }
    // Immagini e tabelle
    :deep(#iubenda_policy img) {
      max-width: 100%;
      height: auto;
    }
    :deep(#iubenda_policy table) {
      width: 100%;
      max-width: 100%;
      border-collapse: collapse;
    }
    :deep(#iubenda_policy th),
    :deep(#iubenda_policy td) {
      padding: 0.75rem;
      font-family: "Roboto", sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      text-align: left;
      border-bottom: 1px solid $color_07;
    }
  }
  .cookie-message {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    line-height: 1.7;
    color: $color_01;
    a {
      font-size: inherit;
      color: $color_04;
      &:hover {
        color: $color_05;
      }
    }
  }
}
@media (max-width: 768px) {
  section {
    .cookie {
      padding: 3rem 0;
    }
    .cookie-document {
      :deep(#iubenda_policy h2) {
        font-size: 1.5rem;
      }
      :deep(#iubenda_policy h3) {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
