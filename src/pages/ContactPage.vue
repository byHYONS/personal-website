<script>
import FormContact from '../components/FormContactComponent.vue';
import GoogleMap from '../components/GoogleMapFrame.vue';

export default {
  nome: 'Contact',

  data() {
    return {

    }
  },
  components: {
    FormContact,
    GoogleMap,
  },
}
</script>


<template>

  <section class="contact-form">
    <div class="container">
      <div class="title">
      </div>
      <div class="row">
        <!-- info di contatto -->
        <div class="info col-12 col-md-6 text-center text-md-end">
          <h4>geometra</h4>
          <h2 class="animated-text">Samuele Paratore</h2>
          <p class="mt-5">
            via libert&agrave; 22<br>
            21030 cugliate fabiasco <br>
            varese
          </p>
          <p class="mt-5">
            info@samueleparatore.com <br>
            +39 380 2073007
          </p>
          <p class="my-5">
            PI 03654740129 <br>
            REA varese 372696
          </p>
        </div>
        <!-- componente form -->
        <div class="message col-12 col-md-6">
          <FormContact />
        </div>
      </div>
    </div>
  </section>
  <!-- componente mappa -->
  <section class="google-map">
    <div class="container-fluid">
      <GoogleMap />
    </div>
  </section>

</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

section.contact-form {
  background: $color_01;
  padding-top: 12rem;

  .info {
    padding-right: min(38em, 8%);
    color: $color_02;
    font-weight: 300;
  }
}

section.google-map {
  background-color: $color_01;

  .container-fluid {
    position: relative;
    padding: 0;
    opacity: .65;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $gradient_02;
      opacity: .65;
      z-index: 1;
    }
  }
}
</style>
