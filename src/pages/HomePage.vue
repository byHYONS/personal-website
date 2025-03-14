<script>
import JumboComponent from '../components/JumboComponent.vue';
import HeroSection from '../components/HeroSectionComponent.vue';

export default {
  nome: 'Home',
  components: {
    JumboComponent,
    HeroSection,
  },
}
</script>


<template>

  <!-- componente jumbotrom -->
  <JumboComponent />
  <!-- componente in tre sezioni -->
  <HeroSection />

</template>


<style lang="scss" scoped></style>
