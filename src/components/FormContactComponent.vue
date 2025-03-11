<script>
import { db } from '../firebase'; // Importiamo Firestore dal file firebase.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default {
  name: 'FormContact',

  data() {
    return {
      formData: {
        name: "",
        phone: "",
        email: "",
        message: "",
        privacy: false,
      },
      recaptchaSiteKey: import.meta.env.VITE_KEY_WEBSITE_RECAPTCHA, // Chiave reCAPTCHA dal .env
      isSubmitting: false,
      successMessage: "",
      errorMessage: "",
      showMessages: false,
      messageTimeout: null,
    };
  },
  methods: {
    async submitForm() {
      // Controllo se la privacy è accettata
      if (!this.formData.privacy) {
        this.errorMessage = "Devi accettare la Privacy Policy.";
        return;
      }

      this.isSubmitting = true;
      this.successMessage = "";
      this.errorMessage = "";
      this.showMessages = false;
      this.fadeOut = false;

      try {
        // 2. Carichiamo reCAPTCHA se non è già presente
        if (!window.grecaptcha) {
          await this.loadRecaptchaScript();
        }

        // Eseguiamo reCAPTCHA
        const token = await this.executeRecaptcha();
        if (!token) {
          throw new Error("Token reCAPTCHA non ricevuto.");
        }

        // Salva i dati in Firestore
        await addDoc(collection(db, "messages"), {
          name: this.formData.name,
          phone: this.formData.phone,
          email: this.formData.email,
          message: this.formData.message,
          timestamp: serverTimestamp(),
          recaptchaToken: token,
        });

        // Messaggio di conferma
        this.successMessage = "Messaggio inviato con successo!";
        this.formData = { name: "", phone: "", email: "", message: "", privacy: false };
        this.showMessages = true;
        this.triggerMessageFadeOut();
      } catch (error) {
        console.error("Errore nell'invio:", error);
        this.errorMessage = "Si è verificato un errore, riprova più tardi.";
      } finally {
        this.isSubmitting = false;
      }
    },

    // Caricamento dinamico dello script reCAPTCHA
    loadRecaptchaScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        // Passiamo la siteKey come parametro ?render=
        script.src = `https://www.google.com/recaptcha/api.js?render=${this.recaptchaSiteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log("Script reCAPTCHA caricato!");
          resolve();
        };
        script.onerror = () => reject("Errore nel caricamento di reCAPTCHA.");
        document.body.appendChild(script);
      });
    },

    // Funzione per eseguire reCAPTCHA v3
    executeRecaptcha() {
      return new Promise((resolve, reject) => {
        if (!window.grecaptcha) return reject("reCAPTCHA non è stato caricato correttamente.");

        grecaptcha.ready(() => {
          grecaptcha.execute(this.recaptchaSiteKey, { action: 'submit' })
            .then(resolve)
            .catch(reject);
        });
      });
    },
    // dopo 25 secondi facciamo sparire il messaggio di avviso
    triggerMessageFadeOut() {
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }

      this.messageTimeout = setTimeout(() => {
        this.showMessages = false;
        this.messageTimeout = null;
      }, 25000);
    }
  },

  beforeUnmount() {

    // Rimuovi eventuali badge iniettati da reCAPTCHA
    const badges = document.querySelectorAll('.grecaptcha-badge');
    badges.forEach(badge => badge.remove());
    // Rimuovi la variabile globale 
    delete window.grecaptcha;

    // resetta setTimeout
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
      this.messageTimeout = null;
    }
  },
}
</script>

<template>
  <div class="form-container pb-5">
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="name">Il tuo nome <span>*</span></label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div class="input-group">
        <label for="phone">Il tuo numero di telefono <span>*</span></label>
        <input type="tel" id="phone" v-model="formData.phone" required>
      </div>
      <div class="input-group">
        <label for="email">La tua email <span>*</span></label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div class="input-group">
        <label for="message">Il tuo messaggio <span>*</span></label>
        <textarea id="message" v-model="formData.message" rows="4" required></textarea>
      </div>
      <div class="privacy-check">
        <input type="checkbox" id="privacy" v-model="formData.privacy" required>
        <label for="privacy">
          Ho preso visione della <router-link :to="{ name: 'privacyPolicy' }">Privacy
            Policy</router-link> e do il
          consenso al trattamento dei dati personali. <span>*</span>
        </label>
      </div>
      <button type="submit" class="explore-btn my-5" :disabled="isSubmitting">
        <img src="/public/favicon/ring.svg" alt="icona cerchio" class="circle-icon" />
        <span class="text">{{ isSubmitting ? "sto inviando..." : "invia" }}</span>
        <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
      </button>
    </form>

    <!-- Messaggi di stato -->
    <div v-if="showMessages" class="messages" :class="{ 'fade-out': !showMessages }">
      <div class="success-message" v-if="successMessage">
        <p class="success m-0">{{ successMessage }}</p>
      </div>
      <div class="error-message" v-if="errorMessage">
        <p class="error m-0">{{ errorMessage }}</p>
      </div>
    </div>

  </div>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.form-container {

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    color: $color_02;
    font-size: clamp(1.1rem, 3.5vw, 1.25rem);
    margin-bottom: 5px;

    span {
      background: $gradient_02;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      vertical-align: top;
      font-size: clamp(1rem, 3vw, 1rem);
    }
  }

  input,
  textarea {
    background: transparent;
    border: 2px solid $color_02;
    color: $color_02;
    padding: 10px;
    font-size: clamp(1rem, 3vw, 1rem);
    border-radius: 8px !important;
    transition: all 0.3s ease-in-out;
  }

  /* Effetto focus con gradient */
  input:focus,
  textarea:focus {
    outline: none;
    border: 2px solid rgba(242, 94, 19, 1);
    box-shadow: 0 0 5px 2px rgba(146, 12, 242, 1);
    border-radius: 8px !important;
  }

  /* Pulsante di invio */
  button {
    color: $color_02;
  }
}

/* Privacy Checkbox */
.privacy-check {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
}

.privacy-check input {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  appearance: none;
  border: 2px solid $color_02;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.privacy-check input:checked {
  background-color: $color_06;
}

.privacy-check input:checked::after {
  content: "✔";
  color: $color_02;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.privacy-check label {
  color: $color_02;
}

.privacy-check a {
  color: $color_06;
  text-decoration: none;
}

.messages {
  color: $color_02;
  opacity: 1;
  transition: opacity 2.5s ease-out;

  &.fade-out {
    opacity: 0;
  }

  .success-message,
  .error-message {
    padding: 10px 25px;
    border-radius: 10px;
    transition: opacity 2.5s ease-out;
  }

  .success-message {
    background-color: $success_bg;
    border: 1px solid $success;
  }

  .error-message {
    background-color: $error_bg;
    border: 1px solid $error;
  }
}
</style>
