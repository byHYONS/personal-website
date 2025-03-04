<script>

import { store } from '../store';
import CanvasBHY from '../components/CanvasComponent.vue';
import JumboComponent from '../components/JumboComponent.vue';
import HeroSection from '../components/HeroSectionComponent.vue';


export default {
  nome: 'Home',
  props: {

  },
  components: {
    CanvasBHY,
    JumboComponent,
    HeroSection,

  },
  data() {
    return {
      store,

    }
  },
}

</script>



<template>

  <JumboComponent />
  <HeroSection />

</template>



<style lang="scss" scoped></style>
